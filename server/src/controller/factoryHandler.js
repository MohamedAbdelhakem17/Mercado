const asyncHandler = require("express-async-handler");
const { httpStatus } = require("../config/systemVariables");
const AppError = require("../util/appError");

const getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const limit = +req.query.limit || 10;
    const page = +req.query.page || 1;
    const skip = (page - 1) * limit;
    const data = await Model.find({}, { __v: 0 }).skip(skip).limit(limit);
    res.status(200).json({ status: httpStatus.SUCCESS, data });
  });

const getOne = (Model) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await Model.findById({ _id: id }, { __v: 0 });
    if (!data)
      throw new AppError(
        404,
        httpStatus.FAIL,
        `Can't Find Product For This id :${id}`
      );
    res.status(200).json({ status: httpStatus.SUCCESS, data });
  });

const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ status: httpStatus.SUCCESS, data: document });
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data)
      throw new AppError(
        404,
        httpStatus.FAIL,
        `Can't Find Product For This id :${id}`
      );
    res.status(200).json({ status: httpStatus.SUCCESS, data });
  });

const deleteOne = (Model) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await Model.findByIdAndDelete({ _id: id });
    if (!data)
      throw new AppError(
        404,
        httpStatus.FAIL,
        `Can't Find Product For This id :${id}`
      );
    res.status(200).json({ status: httpStatus.SUCCESS, data: null });
  });

module.exports = {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
};
