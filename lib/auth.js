import cookie from 'cookie'
import jsonwebtoken from 'jsonwebtoken'

export const setCookie = (user) => {
  const token = jsonwebtoken.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '30d' })

  return cookie.serialize('session', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
      sameSite: 'strict',
      path: '/'
    })
}

export const deleteCookie = () => {
  return cookie.serialize('session', {}, {
    httpOnly: true,
    maxAge: 0,
    secure: true,
    sameSite: 'strict',
    path: '/'
  })
}
