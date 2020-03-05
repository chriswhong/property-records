import React from "react"
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom"

import fetch from 'node-fetch'

import { Form, Button } from 'react-bootstrap'

import { Typeahead } from 'react-bootstrap-typeahead'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'


// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/bbl/:borough/:block/:lot" component={BBLResults}>
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  const [borough, setBorough] = React.useState([])
  const [block, setBlock] = React.useState('')
  const [lot, setLot] = React.useState('')
  const [redirectToBBL, setRedirectToBBL] = React.useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target

    if (id === 'formBasicBlock') {
      setBlock(value)
    }

    if (id === 'formBasicLot') {
      setLot(value)
    }

  }

  const handleSubmit = (e) => {
    console.log('submit')
    e.preventDefault()
    setRedirectToBBL(true)
  }

  if (redirectToBBL === true) {
    return <Redirect to={`/bbl/${borough}/${block}/${lot}`} />
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
          <h2>BBL Search</h2>
            <Form>
              <Form.Group controlId="formBasicBorough">
                <Form.Label>Borough</Form.Label>
                <Typeahead
                  id=""
                  labelKey="name"
                  onChange={setBorough}
                  options={[
                    '1 - Manhattan',
                    '2 - Bronx',
                    '3 - Brooklyn',
                    '4 - Queens',
                    '5 - Staten Island'
                  ]}
                  placeholder="Choose a Borough"
                  selected={borough}
                />
                <Form.Text className="text-muted">
                 Try '1 - Manhattan'
               </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicBlock">
                <Form.Label>Block</Form.Label>
                <Form.Control type="text" placeholder="Block" value={block} onChange={handleChange} />
                <Form.Text className="text-muted">
                 Try '1158'
               </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicLot">
                <Form.Label>Lot</Form.Label>
                <Form.Control type="text" placeholder="Lot" value={lot} onChange={handleChange}/>
                <Form.Text className="text-muted">
                 Use 0000 to search the whole block
               </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
        </div>
      </div>
    </div>
  );
}

function BBLResults(props) {
  const { borough, block, lot } = props.match.params
  console.log(borough, block, lot)

  const form = new FormData()
  form.append('__RequestVerificationToken', 'OYsfCK78eNdFve8HUKr4NpB0uTAOzTDbuxQfWbWHbQTc33IIdM1h8ZhQYKL4QopY7HlQ4Pdexw3IsZrOCf3fE4PvbeQu5ZTunQMMY1JxZd01Zw8skJQvMZQJMMfXhdNg8uL%2BVlR32TEaw5s2wvFx%2BBcQ5hcJ3YujaKGdSZSuCSw%3D')
  form.append('hid_borough', 1)
  form.append('hid_borough_nam', 'MANHATTAN+%2F+NEW+YORK')
  form.append('hid_block', 1158)
  form.append('hid_block_value', 1158)
  form.append('hid_lot', '0000')
  form.append('hid_lot_value', '0000')
  form.append('hid_unit','')
  form.append('hid_selectdate', 'To+Current+Date')
  form.append('hid_datefromm','')
  form.append('hid_datefromd','')
  form.append('hid_datefromy','')
  form.append('hid_datetom','')
  form.append('hid_datetod','')
  form.append('hid_datetoy','')
  form.append('hid_doctype', 'All+Document+Classes')
  form.append('hid_doctype_name', 'All+Document+Classes')
  form.append('hid_max_rows', 100)
  form.append('hid_page', 1)
  form.append('hid_ReqID','')
  form.append('hid_SearchType', 'BBL')
  form.append('hid_ISIntranet', 'N')
  form.append('hid_sort','')

  fetch('https://a836-acris.nyc.gov/DS/DocumentSearch/BBL', {
    mode: 'no-cors',
  })
    .then(d => d.text())
    .then((res) => {
      console.log('foo', res)
      // fetch('https://a836-acris.nyc.gov/DS/DocumentSearch/BBLResult', {
      //   method: 'POST',
      //   mode: 'no-cors',
      //   credentials: 'include',
      //   body: 'hid_borough=1&hid_borough_name=MANHATTAN+%2F+NEW+YORK&hid_block=1158&hid_block_value=1158&hid_lot=0000&hid_lot_value=0000&hid_unit=&hid_selectdate=To+Current+Date&hid_datefromm=&hid_datefromd=&hid_datefromy=&hid_datetom=&hid_datetod=&hid_datetoy=&hid_doctype=All+Document+Classes&hid_doctype_name=All+Document+Classes&hid_max_rows=10&hid_page=1&hid_ReqID=&hid_SearchType=BBL&hid_ISIntranet=N&hid_sort=',
      //   headers: {
      //     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Sec-Fetch-Dest': 'document',
      //     'Sec-Fetch-Mode': 'navigate',
      //     'Sec-Fetch-Site': 'same-origin',
      //     'Sec-Fetch-User': '?1',
      //     'Upgrade-Insecure-Requests': 1
      //   }
      // })
      // .then(d => d.text())
      // .then((res) => {
      //   console.log(res.json)
      // })
    })

  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
