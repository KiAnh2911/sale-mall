import { Table, Button, Space, Popconfirm } from "antd";
import { axiosQuery } from "../../hook/api/fetchApi";
import { useEffect, useState } from "react";
import formatCurrency from "../../utils/formatCurrency";
import ModalProduct from "../../components/modal";
import { toast } from "react-toastify";
import moment from "moment";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flag, setFlag] = useState(false);

  const token = localStorage.getItem("token");

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axiosQuery({
        url: `/product/delete/${id}`,
        method: "DELETE",
      });

      if (res.data?.success) {
        const updatedData = data.filter((product) => product._id !== id);
        setData(updatedData);

        toast.success("Sản phẩm đã được xóa thành công");
      } else {
        toast.error("Xóa sản phẩm thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm", error);
    }
  };

  const handleUpdateProduct = (product) => {
    setType("UPDATE");
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setType("ADD");
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 200,

      render: (text, record) => (
        <img
          src={text}
          alt={record.name}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      width: 200,
      render: (_, record) => (
        <>
          {token ? formatCurrency(record.price, " đ") : <a href="#">liên hệ</a>}
        </>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      render: (_, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY")}</>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            block
            onClick={() => handleUpdateProduct(record)}
            className="bg-blue-600"
            disabled={token ? false : true}
          >
            Update
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => {
              return handleDeleteProduct(record._id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger disabled={token ? false : true}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosQuery({
          url: "/product/list",
          method: "GET",
        });
        setData(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getData();
  }, [flag]);

  return (
    <div className="p-5">
      <Button
        onClick={handleCreate}
        className="mb-5"
        disabled={token ? false : true}
      >
        Create Product
      </Button>

      <h1 className="mb-5 text-xl font-semibold uppercase">
        Danh sách sản phẩm
      </h1>

      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record._id}
        scroll={{ x: 1300 }}
      />

      {isModalVisible && (
        <ModalProduct
          onOpenModal={isModalVisible}
          type={type}
          setOpenModal={() => setIsModalVisible(false)}
          product={selectedProduct}
          setFlag={setFlag}
        />
      )}
    </div>
  );
};

export default ProductList;
