import { useEffect, useState } from "react";
import { Row } from 'react-bootstrap';
import axios from 'axios';
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { AlertBanner } from '../../common';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`)
    .then(res => setItems(res.data))
    .catch(error => {
      setError(true)
    })
  }, [optionType]);

  if(error) {
    return (<AlertBanner />)
  }

  const Component = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const options = items.map(item => <Component key={item.name} {...item} />)

  return (
    <Row>
      {options}
    </Row>
  )
}

export default Options;