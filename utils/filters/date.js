module.exports = function (value) {
  const dateObject = new Date(value)

  return Intl.DateTimeFormat('en-US', {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(dateObject)
}
