import { StatusCodes } from "http-status-codes"

export type StatusCode = typeof StatusCodes[keyof typeof StatusCodes];