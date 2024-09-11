import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import LipRenderer from "./components/lipRenderer";
import _color from "./assets/images/bg/_color.png";

const mythologicalNames = [
  // Greek Mythology
  "Zeus",
  "Athena",
  "Hera",
  "Apollo",
  "Artemis",
  "Ares",
  "Hermes",
  "Poseidon",
  "Demeter",
  "Hades",
  "Persephone",
  "Hercules",
  "Achilles",
  "Odysseus",
  "Theseus",
  
  // Roman Mythology
  "Mars",
  "Venus",
  "Jupiter",
  "Neptune",
  "Juno",
  "Ceres",
  "Pluto",
  "Minerva",
  "Mercury",
  "Bacchus",
  
  // Norse Mythology
  "Odin",
  "Thor",
  "Loki",
  "Freyja",
  "Balder",
  "Tyr",
  "Frigg",
  "Hel",
  "Fenrir",
  "Jormungandr",
  
  // Egyptian Mythology
  "Ra",
  "Isis",
  "Osiris",
  "Horus",
  "Anubis",
  "Bastet",
  "Set",
  "Thoth",
  "Sekhmet",
  "Hathor",
  
  // Hindu Mythology
  "Vishnu",
  "Shiva",
  "Durga",
  "Kali",
  "Lakshmi",
  "Saraswati",
  "Ganesh",
  "Rama",
  "Krishna",
  "Hanuman",
  
  // Celtic Mythology
  "Cernunnos",
  "Brigid",
  "Lugh",
  "Dagda",
  "Morrigan",
  "Aengus",
  "Nuada",
  "Epona",
  "Scathach",
  "Danu",
  
  // Japanese Mythology
  "Amaterasu",
  "Susanoo",
  "Tsukuyomi",
  "Inari",
  "Raijin",
  "Fujin",
  "Hachiman",
  "Kaguya",
  "Jizo",
  "Benten",
  
  // Chinese Mythology
  "Jade Emperor",
  "Pangu",
  "Nuwa",
  "Fuxi",
  "Xiwangmu",
  "Nezha",
  "Sun Wukong",
  "Zhuge Liang",
  "Laozi",
  "Zhong Kui",
  
  // Aztec Mythology
  "Quetzalcoatl",
  "Tezcatlipoca",
  "Huitzilopochtli",
  "Xipe Totec",
  "Tlaloc",
  "Chalchiuhtlicue",
  "Mictlantecuhtli",
  "Coyolxauhqui",
  "Mixcoatl",
  "Tonatiuh"
];

const getRandomName = () => {
  const randomIndex = Math.floor(Math.random() * mythologicalNames.length);
  return mythologicalNames[randomIndex];
};


function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);

  console.log(data);

  const mintNFT = (_account, _name) => {
    setLoading(true);
    blockchain.lipToken.methods
      .createRandomLip(_name)
      .send({
        from: _account,
        value: blockchain.web3.utils.toWei("0.01", "ether"),
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };

  const levelUpLip = (_account, _id) => {
    setLoading(true);
    blockchain.lipToken.methods
      .levelUp(_id)
      .send({
        from: _account,
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };
  
  const sellNFT = (_account, _id, _price) => {
    setLoading(true);
  
    // Chuyển đổi giá từ ETH sang Wei
    const priceInWei = blockchain.web3.utils.toWei(_price, "ether");
  
    blockchain.lipToken.methods
      .putLipForSale(_id, priceInWei)
      .send({
        from: _account,
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };
  

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.lipToken !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.lipToken, blockchain.account, dispatch]);

  return (
    <s.Screen image={_color}>
      {blockchain.account === "" || blockchain.lipToken === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the game</s.TextTitle>
          <s.SpacerSmall />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            CONNECT
          </button>
          <s.SpacerXSmall />
          {blockchain.errorMsg !== "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container ai={"center"} style={{ padding: "24px" }}>
          <s.TextTitle>Welcome to the game</s.TextTitle>
          <s.SpacerSmall />
          <button
            style={{
              background: "linear-gradient(90deg, #FF416C, #FF4B2B)", // Màu gradient từ hồng đến đỏ nổi bật
              color: "#fff", // Màu chữ trắng
              border: "none", // Không có viền
              borderRadius: "30px", // Bo tròn góc
              padding: "15px 30px", // Tăng kích thước của nút
              fontSize: "18px", // Kích thước chữ lớn hơn
              fontWeight: "bold", // Chữ đậm hơn
              letterSpacing: "2px", // Khoảng cách giữa các chữ
              cursor: "pointer", // Hiệu ứng con trỏ khi hover
              transition: "transform 0.2s, box-shadow 0.2s", // Hiệu ứng khi nhấn nút
              boxShadow: "0 4px 10px rgba(255, 75, 43, 0.5)", // Đổ bóng mạnh hơn
            }}
            disabled={loading ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              const randomName = getRandomName(); // Chọn tên ngẫu nhiên
              mintNFT(blockchain.account, randomName);
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)"; // Phóng to nút khi hover
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)"; // Trở về kích thước bình thường khi rời chuột
            }}
          >
            ROLL GACHA
          </button>

          <s.SpacerMedium />
            <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }}>
              {data.allLips.map((item, index) => {
                return (
                  <s.Container
                    key={index}
                    style={{
                      padding: "15px",
                      borderRadius: "15px", // Bo tròn các góc
                      backgroundColor: "#f5f5f5", // Thêm màu nền nhẹ
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Hiệu ứng đổ bóng
                      overflow: "visible", // Hiển thị đầy đủ nội dung mà không bị cắt
                      minWidth: "200 px", // Đảm bảo chiều rộng tối thiểu để phần tử không quá nhỏ
                      margin: "10px", // Khoảng cách giữa các item
                      // flex: "1 1 300px", // Đảm bảo các phần tử có thể co giãn linh hoạt
                    }}
                  >
                    <LipRenderer lip={item} />
                    <s.SpacerXSmall />
                    <s.Container>
                      {/* Chỉnh màu chữ thành màu đen */}
                      <s.TextDescription style={{ color: "black" }}>ID: {item.id}</s.TextDescription>
                      <s.TextDescription style={{ color: "black" }}>DNA: {item.dna}</s.TextDescription>
                      <s.TextDescription style={{ color: "black" }}>LEVEL: {item.level}</s.TextDescription>
                      <s.TextDescription style={{ color: "black" }}>NAME: {item.name}</s.TextDescription>
                      <s.TextDescription style={{ color: "black" }}>RARITY: {item.rarity}</s.TextDescription>
                      <s.SpacerXSmall />
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              {/* Chỉnh sửa độ dài nút và căn đều */}
              <button
                className="modern-button"
                style={{
                  flex: 0.45, // Đảm bảo độ rộng nút nhỏ hơn so với toàn bộ không gian
                  marginRight: "10px", // Khoảng cách giữa các nút
                  maxWidth: "120px", // Đặt chiều rộng tối đa cho nút
                  fontSize: "14px", // Kích thước chữ nhỏ hơn
                  padding: "10px 20px", // Điều chỉnh kích thước padding để phù hợp với kích thước chữ
                }}
                disabled={loading ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  levelUpLip(blockchain.account, item.id);
                }}
              >
                Up Lv
              </button>
              <button
                className="sell-button"
                style={{
                  flex: 0.45, // Đảm bảo độ rộng nút nhỏ hơn so với toàn bộ không gian
                  marginLeft: "10px", // Khoảng cách giữa các nút
                  maxWidth: "120px", // Đặt chiều rộng tối đa cho nút
                  fontSize: "14px", // Kích thước chữ nhỏ hơn
                  padding: "10px 20px", // Điều chỉnh kích thước padding để phù hợp với kích thước chữ
                }}
                disabled={loading ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  const price = prompt("Enter sale price:"); // Nhập giá bán từ người dùng
                  if (price && !isNaN(price)) {
                    levelUpLip(blockchain.account, item.id, price);
                  }
                }}
              >
                Sell
              </button>
              
            </div>
        </s.Container>
      </s.Container>
    );
  })}
</s.Container>

        </s.Container>
      )}
    </s.Screen>
  );
}

export default App;
