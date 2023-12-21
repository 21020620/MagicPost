import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import logo from "../../img/icon.png"
import MyHeader from './MyHeader';
import axios from 'axios';
import StatisticTable from '../StatisticTable';

  
const TransactionManagerStatistic = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([
    {
      "id": 1,
      "sender_name_address": "Sender Name 1",
      "sender_phone_number": "Sender Phone 1",
      "sender_code": "Sender code 1",
      "sender_zip_code": "Sender Zip code 1",
      "receiver_name_address": "Receiver Name 1",
      "receiver_phone_receiver": "Receiver Phone 1",
      "receiver_zip_code": "Receiver Zip code 1",
      "type_of_shipment": "Type of Shipment 1",
      "basic_frieght_charges": 500,
      "surcharge": 50,
      "transportation_fee": 250,
      "total_freight_charge": 800,
      "sender_other_charges": 100,
      "sender_total": 900,
      "cod": 200,
      "receiver_other_charges": 80,
      "receiver_total": 800,
    },
    {
      "id": 2,
      "sender_name_address": "Sender Name 2",
      "sender_phone_number": "Sender Phone 2",
      "sender_code": "Sender code 2",
      "sender_zip_code": "Sender Zip code 2",
      "receiver_name_address": "Receiver Name 2",
      "receiver_phone_receiver": "Receiver Phone 2",
      "receiver_zip_code": "Receiver Zip code 2",
      "type_of_shipment": "Type of Shipment 2",
      "basic_frieght_charges": 700,
      "surcharge": 30,
      "transportation_fee": 300,
      "total_freight_charge": 1000,
      "sender_other_charges": 120,
      "sender_total": 1120,
      "cod": 180,
      "receiver_other_charges": 70,
      "receiver_total": 950,
    },
    {
      "id": 3,
      "sender_name_address": "Sender Name 3",
      "sender_phone_number": "Sender Phone 3",
      "sender_code": "Sender code 3",
      "sender_zip_code": "Sender Zip code 3",
      "receiver_name_address": "Receiver Name 3",
      "receiver_phone_receiver": "Receiver Phone 3",
      "receiver_zip_code": "Receiver Zip code 3",
      "type_of_shipment": "Type of Shipment 3",
      "basic_frieght_charges": 800,
      "surcharge": 40,
      "transportation_fee": 350,
      "total_freight_charge": 1190,
      "sender_other_charges": 90,
      "sender_total": 1280,
      "cod": 220,
      "receiver_other_charges": 60,
      "receiver_total": 1100,
    },
    {
      "id": 4,
      "sender_name_address": "Sender Name 4",
      "sender_phone_number": "Sender Phone 4",
      "sender_code": "Sender code 4",
      "sender_zip_code": "Sender Zip code 4",
      "receiver_name_address": "Receiver Name 4",
      "receiver_phone_receiver": "Receiver Phone 4",
      "receiver_zip_code": "Receiver Zip code 4",
      "type_of_shipment": "Type of Shipment 4",
      "basic_frieght_charges": 550,
      "surcharge": 25,
      "transportation_fee": 200,
      "total_freight_charge": 775,
      "sender_other_charges": 80,
      "sender_total": 855,
      "cod": 160,
      "receiver_other_charges": 75,
      "receiver_total": 700,
    },
    {
      "id": 5,
      "sender_name_address": "Sender Name 5",
      "sender_phone_number": "Sender Phone 5",
      "sender_code": "Sender code 5",
      "sender_zip_code": "Sender Zip code 5",
      "receiver_name_address": "Receiver Name 5",
      "receiver_phone_receiver": "Receiver Phone 5",
      "receiver_zip_code": "Receiver Zip code 5",
      "type_of_shipment": "Type of Shipment 5",
      "basic_frieght_charges": 650,
      "surcharge": 35,
      "transportation_fee": 400,
      "total_freight_charge": 1085,
      "sender_other_charges": 110,
      "sender_total": 1195,
      "cod": 180,
      "receiver_other_charges": 90,
      "receiver_total": 1020,
    },
    {
      "id": 6,
      "sender_name_address": "Sender Name 6",
      "sender_phone_number": "Sender Phone 6",
      "sender_code": "Sender code 6",
      "sender_zip_code": "Sender Zip code 6",
      "receiver_name_address": "Receiver Name 6",
      "receiver_phone_receiver": "Receiver Phone 6",
      "receiver_zip_code": "Receiver Zip code 6",
      "type_of_shipment": "Type of Shipment 6",
      "basic_frieght_charges": 750,
      "surcharge": 45,
      "transportation_fee": 500,
      "total_freight_charge": 1295,
      "sender_other_charges": 120,
      "sender_total": 1415,
      "cod": 240,
      "receiver_other_charges": 120,
      "receiver_total": 1235,
    },
    {
      "id": 7,
      "sender_name_address": "Sender Name 7",
      "sender_phone_number": "Sender Phone 7",
      "sender_code": "Sender code 7",
      "sender_zip_code": "Sender Zip code 7",
      "receiver_name_address": "Receiver Name 7",
      "receiver_phone_receiver": "Receiver Phone 7",
      "receiver_zip_code": "Receiver Zip code 7",
      "type_of_shipment": "Type of Shipment 7",
      "basic_frieght_charges": 600,
      "surcharge": 20,
      "transportation_fee": 250,
      "total_freight_charge": 870,
      "sender_other_charges": 100,
      "sender_total": 970,
      "cod": 200,
      "receiver_other_charges": 80,
      "receiver_total": 850,
    },
  ]
  );

  const [message, setMessage] = useState("defuakt");

  const fetchData = async () => {
    try {
      console.log('Fetching data from API...');
      const response = await axios.get('/api/v1/ceo/TestingHomePage', { cache: false });
      setMessage(response.data);
    } catch (error) {        
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    console.log('useEffect triggered.');
    fetchData();
  }, []);

  return (
    <div>
      <StatisticTable data={data}/>
    </div>
  );
};
export default TransactionManagerStatistic;