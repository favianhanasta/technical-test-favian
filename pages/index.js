import { Spin, Col, Row, Button, Divider, Select } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import ModalDetail from "../components/modal";
const moment = require('moment');


function Home(props) {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get('https://randomuser.me/api/?page=1&results=10')
      .then((res) => {
        setData(res.data.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  // console.log(data)

  const modalClose = () => {
    setModalVisible(false);
    setDataModal({});
  }

  const onModal = (data) => {
    setModalVisible(true);
    setDataModal(data);
  }

  const handleSelect = (event) => {
    setData([]);
    axios.get(`https://randomuser.me/api/?page=1&results=10&&nat=${event.toLocaleLowerCase()}`)
      .then((res) => {
        setData(res.data.results);
      })
      .catch((error) => console.log(error));
    console.log(filterNat);
  }

  const filterFunction = () => {
    axios.get(`https://randomuser.me/api/?page=1&results=10&&nat=${filterNat.toLocaleLowerCase()}`)
      .then((res) => {
        setData(res.data.results);
      })
      .catch((error) => console.log(error));
  }

  const printUserList = () => {
    if (data.length > 0) {
      return data.map((value, index) => {
        return (
          <div key={index} className={styles.bodyList}>
            <Row>
              <Col span={12}>
                <div className={styles.firstContent}>
                  <img src={value.picture.large} className={styles.fotoProfil} alt='picture profile' />
                  <div style={{ marginLeft: '1rem' }}>
                    <p style={{ fontWeight: '600', fontSize: '18px' }}>{`${value.name.title}. ${value.name.first} ${value.name.last}`}</p>
                    <p style={{ marginTop: '-1rem' }}>{value.email}</p>
                    <Button type="primary" style={{ position: 'right' }} onClick={() => onModal(value)}>Detail</Button>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div>
                  <p style={{ color: 'grey' }}>Date of Birth</p>
                  <p style={{ marginTop: '-1rem' }}>{moment(value.dob.date).format('DD/MM/YYYY')}</p>
                </div>
                <div>
                  <p style={{ color: 'grey' }}>Age</p>
                  <p style={{ marginTop: '-1rem' }}>{moment(moment(value.dob.date).format('MM/DD/YYYY'), "MM/DD/YYYY").month(0).from(moment().month(0), "years")}</p>
                </div>
              </Col>
              <Col span={6} style={{ paddingLeft: '2rem' }}>
                <div>
                  <p style={{ color: 'grey' }}>City</p>
                  <p style={{ marginTop: '-1rem' }}>{value.location.city}</p>
                </div>
                <div>
                  <p style={{ color: 'grey' }}>Nationality</p>
                  <p style={{ marginTop: '-1rem' }}>{value.nat}</p>
                </div>
              </Col>
            </Row>
          </div>
        )
      })
    }
  }

  const printFilter = () => {
    let nat = ["AU", "BR", "CA", "CH", "DE", "DK", "ES", "FI", "FR", "GB", "IE", "IR", "NO", "NL", "NZ", "TR", "US"];
    return nat.map((value, index) => {
      return (
        <Select.Option key={index} value={value}>{value}</Select.Option>
      )
    })
  }

  if (isLoading) {
    return (
      <div style={{ padding: '20rem' }}>
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
          <p style={{ color: '#1DA1F2', fontSize: '20px' }}>Loading</p>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <ModalDetail handleCancel={modalClose} visible={modalVisible} data={dataModal} />
        <div className={styles.container}>
          <Divider orientation="left">
            <h2 style={{ color: '#1DA1F2' }}>List of User</h2>
          </Divider>
          <div>
            <div>
              <p>Filter Nationality</p>
              <Select style={{ width: '150px' }} onChange={handleSelect} defaultValue="Select">
                <Select.Option value="Select" disabled>Select</Select.Option>
                <Select.Option value="">All</Select.Option>
                {printFilter()};
              </Select>
            </div>
          </div>
          <div>
            {printUserList()}
          </div>
        </div>
      </>
    )
  }
}

export default Home;