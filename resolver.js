
const getRss = require("./src/rss/rss")
const getMultipleRss = require("./src/multipleRss/multipleRss")

const resolvers = {
    Query: {
        rss: (obj, args, ctx, info) => {
            return getRss(args)
        },
        multipleRss: (obj, args, ctx, info) => {
            return getMultipleRss(args)
        }
}
}

module.exports = resolvers