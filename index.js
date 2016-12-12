import React from 'react'

import { render } from 'react-dom'

import menu from './components/menu'

import options from './components/options'

const container = document.querySelector('#options') || document.querySelector('#menu')

const { type } = container.dataset

const Components = { menu, options }

const Main = Components[type]

render(<Main />, container)
