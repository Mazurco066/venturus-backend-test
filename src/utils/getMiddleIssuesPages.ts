const getMiddleIssuePages = (lastPage: number) =>
  [...new Array(lastPage + 1).keys()].splice(2, lastPage)

export default getMiddleIssuePages