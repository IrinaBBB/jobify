import { nanoid } from 'nanoid'
import { StatusCodes } from 'http-status-codes'
import Job from '../models/JobModel.js'
import { NotFoundError } from '../errors/customErrors.js'

let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end developer' },
    { id: nanoid(), company: 'google', position: 'back-end developer' },
]

/** GET ALL JOBS */
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({})
    res.status(StatusCodes.OK).json({ jobs })
}

/** CREATE A JOB */
export const createJob = async (req, res) => {
    const { company, position } = req.body

    const job = await Job.create({ company, position })
    res.status(StatusCodes.CREATED).json({ job })
}

/** GET A JOB */
export const getJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findById(id)
    if (!job) throw new NotFoundError(`no job with id : ${id}`)
    res.status(StatusCodes.OK).json({ job })
}

/** UPDATE A JOB */
export const updateJob = async (req, res) => {
    const { id } = req.params

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
    })

    if (!updatedJob) {
        throw new NotFoundError(`no job with id : ${id}`)
    }

    res.status(StatusCodes.OK).json({ job: updatedJob })
}

/** DELETE A JOB */
export const deleteJob = async (req, res) => {
    const { id } = req.params
    const removedJob = await Job.findByIdAndDelete(id)

    if (!removedJob) {
        return res.status(404).json({ msg: `no job with id ${id}` })
    }
    res.status(StatusCodes.OK).json({ job: removedJob })
}
