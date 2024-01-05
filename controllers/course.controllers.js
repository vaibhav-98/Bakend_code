import Course from '../models/course.model.js' 
import AppError  from "../utils/error.util.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

 


//================================== ( create Course ) =========================================//

const createCourse = async (req, res, next) => {
    try {
        const { title, description, category, createdBy } = req.body;

        if (!title || !description || !category || !createdBy) {
            throw new AppError('All fields are required', 400);
        }

        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail: {
                public_id: 'Dumy',
                secure_url: 'Dumy',
            },
        });

        if (!course) {
            throw new AppError('Course could not be created, please try again', 400);
        }

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
            });
            if (result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }
            fs.rm(`uploads/${req.file.filename}`);
        }

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Course created successfully',
            course,
        });
    } catch (error) {
        // Handle structural errors or unexpected exceptions
        console.error('Error in createCourse:', error);
        return next(new AppError('Internal Server Error', 500));
    }
};


//================================== ( get All Course )=========================================//
    const getAllCourses = async (req,res,next) => {
        const course  = await Course.find({}).select('-lectures')
    
        res.status(200).json({
            success:true,
            message: 'All courses',
            course,
        })

}

//====================================== ( get Lectures by  course Id ) ========================//
const getLecturesByCourseId = async (req,res,next) => {

    try {
        const { id } = req.params;
        
        const course = await Course.findById(id);

        if(!course) {
            return next(
                new AppError('Invalid course id ', 400)
            )
        }

        res.status(200).json({
            success: true,
            message: 'Course lectures fetched successfully',
            lectures: course.lectures,
        })
     } catch (error) {
        return next(
            new AppError(error.message, 500)
        )
     }

}

//====================================== ( update Course ) =====================================//

const  updateCourse = async (req,res,next) => {
       try {
          const { id } = req.params;
          const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            {
                runValidators: true
            }
          );

          if(!course) {
            return next(
                new AppError('Course with given id does not exist', 500)
            )
          }

          res.status(200).json({
            success:true,
            message: 'Course updated successfully',
            course
          })
       } catch (error) {
        return next(
            new AppError(error.message, 500)
        )
       }


}


//===================================== ( Delete Course ) ======================================//

const removeCourse = async (req,res,next) => {

  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    
    if(!course) {
        return next(
            new AppError('Course with given id does not exist', 500)
        )
      };

      await Course.findByIdAndDelete(id)

      res.status(200).json({
        success:true,
        message: 'Course deleted succesfully',

      })

  } catch (error) {
    return next(
        new AppError(error.message, 500)
    )
  }


}

const addLectureToCourseById = async (req,res,next) => {
      const { title , description} = req.body;
      const { id } = req.params;

      if (!title || !description) {
        throw new AppError('All fields are required', 400);
    };

    const course = await Course.findById(id)

    if(!course) {
        return next(
            new AppError('Course with given id does not exist', 500)
        )
      };

      const lectureData = {
         title,
         description,
         lecture: {}
      }

      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'lms',
        });
        if (result) {
            lectureData.lecture.public_id = result.public_id;
            lectureData.lecture.secure_url = result.secure_url;
        }
        fs.rm(`uploads/${req.file.filename}`);
    }
    
    course.lectures.push(lectureData);

    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
        success: true,
        message: 'Lecture succuessfully aadded to the course',
        course,
    })

}

export {
    createCourse,
    getAllCourses,
    getLecturesByCourseId,
    updateCourse,
    removeCourse,
    addLectureToCourseById
}