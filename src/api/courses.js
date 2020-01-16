import axios from 'axios'

export function fetchList(params) {
  return axios.get('http://api.ucas.work/courses/', { params })
}

export function fetchTimeTable(params) {
  return axios.get('http://api.ucas.work/courses/fetchtimetable', { params })
}

export function detect(params) {
  return axios.get('http://api.ucas.work/courses/detect', { params })
}
