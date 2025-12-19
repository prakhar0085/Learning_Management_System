import uploadOnCloudinary from '../configs/cloudinary.js';
import Course from '../models/courseModel.js';
import Lecture from '../models/lectureModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

// create Courses
export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: 'title and category is required' });
    }
    const course = await Course.create({
      title,
      category,
      creator: req.userId,
    });

    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Failed to create course ${error}` });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate('lectures reviews');
    if (!courses) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: `Failed to get All  courses ${error}` });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: `Failed to get creator courses ${error}` });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, subTitle, description, category, level, price, isPublished } = req.body;
    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
      thumbnail,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Failed to update course ${error}` });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Validate courseId format
    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID format' });
    }

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.error('Get course by ID error:', error);
    return res.status(500).json({ message: `Failed to get course: ${error.message}` });
  }
};
export const removeCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.deleteOne();
    return res.status(200).json({ message: 'Course Removed Successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Failed to remove course ${error}` });
  }
};

//create lecture

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: 'Lecture Title required' });
    }

    // Validate courseId format
    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID format' });
    }

    // First check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create the lecture
    const lecture = await Lecture.create({ lectureTitle });

    // Add lecture to course and save
    course.lectures.push(lecture._id);

    // Save without validation to avoid enum issues with existing data
    await course.save({ validateBeforeSave: false });

    // Populate lectures to get updated course data
    await course.populate('lectures');

    return res.status(201).json({ lecture, course });
  } catch (error) {
    console.error('Create lecture error:', error);
    return res.status(500).json({ message: `Failed to Create Lecture: ${error.message}` });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Validate courseId format
    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID format' });
    }

    const course = await Course.findById(courseId).populate('lectures');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error('Get course lectures error:', error);
    return res.status(500).json({ message: `Failed to get Lectures: ${error.message}` });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;

    // Validate lectureId format
    if (!mongoose.isValidObjectId(lectureId)) {
      return res.status(400).json({ message: 'Invalid lecture ID format' });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    let videoUrl;
    if (req.file) {
      videoUrl = await uploadOnCloudinary(req.file.path);
      lecture.videoUrl = videoUrl;
    }
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();
    return res.status(200).json(lecture);
  } catch (error) {
    return res.status(500).json({ message: `Failed to edit Lectures ${error}` });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    //remove the lecture from associated course

    await Course.updateOne({ lectures: lectureId }, { $pull: { lectures: lectureId } });
    return res.status(200).json({ message: 'Lecture Remove Successfully' });
  } catch (error) {
    return res.status(500).json({ message: `Failed to remove Lectures ${error}` });
  }
};

//get Creator data

// controllers/userController.js

export const getCreatorById = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'get Creator error' });
  }
};
