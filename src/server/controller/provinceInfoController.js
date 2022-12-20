const fs = require('fs');
const path = require('path');
const AppError = require('../utils/AppError');

const provinceIndex = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', 'dev-data', 'province-index.json'),
    'utf-8'
  )
);

const codes = Object.keys(provinceIndex).map(
  (prov) => provinceIndex[prov].code
);

exports.getAllProvince = (req, res, next) => {
  const result = [];

  Object.keys(provinceIndex).forEach((prov) => {
    const info = {
      name: prov,
      code: provinceIndex[prov].code,
    };

    result.push(info);
  });

  res.status(200).json({
    status: 'success',
    data: result,
  });
};

exports.getDistrictInProvince = (req, res, next) => {
  try {
    const { code } = req.params;
    if (!codes.includes(code))
      return next(new AppError(401, 'No province code found'));
    const wardInfo = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '..', 'dev-data/province-data', `${code}.json`),
        'utf-8'
      )
    );
    const { district } = wardInfo;
    const result = district.map((el, i) => {
      const { name, pre } = el;
      return {
        name: `${pre} ${name}`,
        id: i,
      };
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    return next(new AppError(401, 'No province code found'));
  }
};

exports.getWard = (req, res, next) => {
  const { code, id } = req.params;
  if (!codes.includes(code))
    return next(new AppError(401, 'No province code found'));
  const wardInfo = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '..', 'dev-data/province-data', `${code}.json`),
      'utf-8'
    )
  );
  if (!wardInfo.district[+id])
    return next(new AppError(401, 'No Ward id found'));
  res.status(200).json({
    status: 'success',
    province: wardInfo.name,
    district: wardInfo.district[+id].name,
    data: wardInfo.district[+id].ward.map((el) => `${el.pre} ${el.name}`),
  });
};

exports.randomFeature = (req, res, next) => {
  res.status(200).json({
    text: 'random feature',
  });
};
