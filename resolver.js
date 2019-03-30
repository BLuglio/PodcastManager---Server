
const getRss = require("./src/rss/rss")

const resolvers = {
    Query: {
        rss: (obj, args, ctx, info) => {
            return getRss(args)
        }
}
}

module.exports = resolvers