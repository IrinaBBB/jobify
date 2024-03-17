import { nanoid } from 'nanoid'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/customErrors.js'

let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end developer' },
    { id: nanoid(), company: 'google', position: 'back-end developer' },
]

export const getAllJobs = async (req, res) => {
    res.status(StatusCodes.CREATED).json({ jobs })
}

export const createJob = async (req, res) => {
    const { company, position } = req.body

    if (!company || !position) {
        return res
            .status(400)
            .json({ msg: 'please provide company and position' })
    }
    const id = nanoid(10)
    const job = { id, company, position }
    jobs.push(job)
    res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req, res) => {
    const { id } = req.params
    const job = jobs.find((job) => job.id === id)
    if (!job) {
        throw new Error('no job with that id')
    }
    res.status(StatusCodes.CREATED).json({ job })
}

export const updateJob = async (req, res) => {
    const { company, position } = req.body
    if (!company || !position) {
        return res
            .status(400)
            .json({ msg: 'please provide company and position' })
    }
    const { id } = req.params
    const job = jobs.find((job) => job.id === id)
    if (!job) {
        if (!job) throw new NotFoundError(`no job with id : ${id}`)
    }

    job.company = company
    job.position = position
    res.status(StatusCodes.CREATED).json({ msg: 'job modified', job })
}

export const deleteJob = async (req, res) => {
    const { id } = req.params
    const job = jobs.find((job) => job.id === id)
    if (!job) {
        return res.status(404).json({ msg: `no job with id ${id}` })
    }
    jobs = jobs.filter((job) => job.id !== id)

    res.status(StatusCodes.OK).json({ msg: 'job deleted' })
}
