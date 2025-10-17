const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { generateOTP, generateOTPExpiry, verifyOTP } = require('../utils/otpService');
const { sendOTPEmail } = require('../utils/emailService');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register user (sends OTP)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  console.log('\n=== REGISTER REQUEST STARTED ===');
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;
    console.log('📝 Extracted fields - Name:', name, 'Email:', email);

    // Check if user already exists
    console.log('🔍 Checking if user exists...');
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('❌ User already exists');
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    console.log('✅ User does not exist, proceeding...');

    // Generate OTP
    console.log('🔢 Generating OTP...');
    const otp = generateOTP();
    const otpExpiry = generateOTPExpiry();
    console.log('✅ OTP generated:', otp, 'Expires:', otpExpiry);

    // Create user (unverified)
    console.log('💾 Creating user in database...');
    const user = await User.create({
      name,
      email,
      password,
      otp,
      otpExpiry,
      isVerified: false
    });
    console.log('✅ User created successfully:', user._id);

    if (user) {
      // Send OTP email
      console.log('📧 Sending OTP email...');
      try {
        await sendOTPEmail(email, otp, name);
        console.log('✅ OTP email sent successfully');
      } catch (emailError) {
        console.error('⚠️  Error sending OTP email:', emailError.message);
        // Continue even if email fails
      }

      console.log('✅ Registration completed successfully');
      res.status(201).json({
        success: true,
        message: 'Registration successful. Please verify your email with the OTP sent.',
        data: {
          _id: user._id,
          email: user.email,
          requiresVerification: true
        }
      });
    } else {
      console.log('❌ User creation returned null');
      res.status(400).json({
        success: false,
        message: 'Invalid user data'
      });
    }
  } catch (error) {
    console.error('❌ REGISTER ERROR:', error);
    console.error('Error Stack:', error.stack);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
  console.log('=== REGISTER REQUEST ENDED ===\n');
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
  console.log('\n=== VERIFY OTP REQUEST STARTED ===');
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      console.log('❌ Missing email or OTP');
      return res.status(400).json({
        success: false,
        message: 'Please provide email and OTP'
      });
    }
    console.log('📝 Verifying OTP for email:', email);

    // Find user with OTP fields
    console.log('🔍 Finding user with OTP...');
    const user = await User.findOne({ email }).select('+otp +otpExpiry');

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    console.log('✅ User found:', user._id);
    console.log('🔢 Stored OTP:', user.otp, 'Provided OTP:', otp);

    // Verify OTP
    console.log('🔐 Verifying OTP...');
    const verification = verifyOTP(user.otp, user.otpExpiry, otp);

    if (!verification.valid) {
      console.log('❌ OTP verification failed:', verification.message);
      return res.status(400).json({
        success: false,
        message: verification.message
      });
    }
    console.log('✅ OTP verified successfully');

    // Update user as verified and clear OTP
    console.log('💾 Updating user verification status...');
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    console.log('✅ User verified and OTP cleared');

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.error('❌ VERIFY OTP ERROR:', error);
    console.error('Error Stack:', error.stack);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
  console.log('=== VERIFY OTP REQUEST ENDED ===\n');
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'User is already verified'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = generateOTPExpiry();

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, user.name);
    } catch (emailError) {
      console.error('Error sending OTP email:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email'
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP resent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  console.log('\n=== LOGIN REQUEST STARTED ===');
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    console.log('📝 Login attempt for email:', email);

    // Check if email and password provided
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check for user (include password field)
    console.log('🔍 Finding user in database...');
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    console.log('✅ User found:', user._id);

    // Check if password matches
    console.log('🔐 Verifying password...');
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log('❌ Password mismatch');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    console.log('✅ Password matched');

    // Check if user is verified
    console.log('🔍 Checking verification status...');
    if (!user.isVerified) {
      console.log('❌ User not verified');
      return res.status(401).json({
        success: false,
        message: 'Please verify your email first'
      });
    }
    console.log('✅ User is verified');

    console.log('🔑 Generating token...');
    const token = generateToken(user._id);
    console.log('✅ Login successful');

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        token: token
      }
    });
  } catch (error) {
    console.error('❌ LOGIN ERROR:', error);
    console.error('Error Stack:', error.stack);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
  console.log('=== LOGIN REQUEST ENDED ===\n');
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/updateprofile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
