export const setContent = (inputer, oldContent, newContent, content, endPosition, start, end) => {
  newContent = oldContent.substring(0, endPosition) + content + oldContent.substring(endPosition, oldContent.length)
  inputer.value = newContent
  inputer.setSelectionRange(endPosition + start, endPosition + content.length - end)
  return newContent
}

export const upDateContent = (inputer, oldContent, newContent, startPosition, endPosition, symbol1, symbol2) => {
  newContent = oldContent.substring(0, startPosition) + symbol1 + oldContent.substring(startPosition, endPosition) + symbol2 + oldContent.substring(endPosition, oldContent.length)
  inputer.value = newContent
  let len = newContent.length
  inputer.setSelectionRange(len, len)
  return newContent
}