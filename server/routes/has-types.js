module.exports = function(objectToCheck, expectedTypes) {
  // Check if objectToCheck actually is an object.
  if (typeof objectToCheck != "object" || objectToCheck == null) {
    return false;
  }

  // Return false as soon as we find a mismatch.
  for (const key of Object.keys(expectedTypes)) {
    if (
      !(key in objectToCheck) ||
      objectToCheck[key].constructor != expectedTypes[key]
    ) {
      return false;
    }
  }

  // Return true when no mismatches exist.
  return true;
};
