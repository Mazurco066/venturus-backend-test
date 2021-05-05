// Utils
const getLastPageFromURL = (link: string) => 
  parseInt(link.split(',').pop().match(/page=\d+>/i)[0].replace(/\D/g, ''), 10)

// Named export
export default getLastPageFromURL