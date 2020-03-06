exports.signup = (req, res) => {
  console.log("REQ BODY", req.body)
  res.json({
    message: "Signup Working!"
  })
}

exports.signout = (req, res) => {
  res.json({
    message: "User signout"
  });
};
