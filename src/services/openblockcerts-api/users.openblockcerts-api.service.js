import qs from 'qs'
import helper from './helpers/headers.openblockcerts-api.helper'

const route = process.env.REACT_APP_API + 'users'

const create = async user => {
  try {
    const response = await window.fetch(
      route, {
        method: 'POST',
        headers: helper.setHeadersWithToken(),
        body: JSON.stringify({
          user
        })
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const destroy = async id => {
  try {
    const response = await window.fetch(
      `${route}/${Number(id)}`, {
        method: 'DELETE',
        headers: helper.setHeadersWithToken()
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const getAll = async params => {
  try {
    let uri = route
    if (params) {
      uri = `${route}?${qs.stringify(params)}`
    }
    const response = await window.fetch(
      uri, {
        method: 'GET',
        headers: helper.setHeadersWithToken()
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const getOne = async id => {
  try {
    const response = await window.fetch(
      `${route}/${Number(id)}`, {
        method: 'GET',
        headers: helper.setHeadersWithToken()
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

const update = async (id, data) => {
  try {
    const response = await window.fetch(
      `${route}/${Number(id)}`, {
        method: 'PATCH',
        headers: helper.setHeadersWithToken(),
        body: JSON.stringify(data)
      }
    )
    return await response.json()
  } catch (e) {
    return e
  }
}

export default {
  create,
  destroy,
  getAll,
  getOne,
  update
}
