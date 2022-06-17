import { Modal, Row, Col } from "antd";
import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";
const moment = require('moment');

function ModalDetail(props) {
    let { data } = props;
    if (data.name) { // proteksi for printData
        return (
            <>
                <Modal
                    visible={props.visible}
                    onCancel={props.handleCancel}
                    onOk={props.handleCancel}
                    title="Detail"
                    width={750}
                >
                    <div style={{ padding: '1rem' }}>
                        <Row>
                            <Col span={12}>
                                <div style={{textAlign:'center',marginTop:'2rem'}}>
                                    <img src={data.picture.large} alt="profil picture" style={{ borderRadius: '50%' }} />
                                    <p style={{ fontWeight: '600' }}>{data.name.title}. {data.name.first} {data.name.last}</p>
                                    <p style={{ marginTop: '-1rem' }}>{data.email}</p>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className={styles.modalBody}>
                                    <div>
                                        <p style={{ color: 'grey' }}>Date of Birth</p>
                                        <p style={{ marginTop: '-1rem' }}>{moment(data.dob.date).format('DD/MM/YYYY')}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: 'grey' }}>Age</p>
                                        <p style={{ marginTop: '-1rem' }}>{moment(moment(data.dob.date).format('MM/DD/YYYY'), "MM/DD/YYYY").month(0).from(moment().month(0), "years")}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: 'grey' }}>Nationality</p>
                                        <p style={{ marginTop: '-1rem' }}>{data.nat}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: 'grey' }}>City</p>
                                        <p style={{ marginTop: '-1rem' }}>{data.location.city}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: 'grey' }}>Address</p>
                                        <p style={{ marginTop: '-1rem' }}>{data.location.street.name} {data.location.street.number}, {data.location.state}, {data.location.city}, {data.location.postcode}, {data.location.country}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </>
        )
    }
}

export default ModalDetail;