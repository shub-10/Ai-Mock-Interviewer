const redis = require('../utils/redis')


const rateLimiterMiddleware = async(req, res, next)=>{
  try {
    const userId = req.user.id
    const today = new Date().toDateString()

    const key = `Interview:${userId}:${today}`

    const count = await redis.get(key)
    if(count > 2) {
      return res.status(429).json({message: "Daily interview limit of 2 has reached. comeback tomorrow"})
    }

    await redis.incr(key)
    await redis.expire(key, 86400)
    next()

  } catch (error) {
    return res.status(500).json({message:"rate limiter broke"})
  }
}


module.exports = rateLimiterMiddleware