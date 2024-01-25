/* eslint-disable react/prop-types */
import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createApi, updateApi } from "../hook/api/api";
const { TextArea } = Input;

const ModalProduct = ({
  onOpenModal,
  setOpenModal,
  type,
  product,
  setFlag,
}) => {
  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    if (type === "ADD") {
      try {
        await createApi(data, "/product/create");
        setOpenModal(false);
        setFlag((prev) => !prev);
        toast.success("Tạo sản phẩm thành công");
      } catch (error) {
        console.log("Error create", error);
        toast.error("Tạo sản phẩm thất bại");
      }
    } else {
      try {
        await updateApi(data, `/product/update/${product?._id}`);
        setOpenModal(false);
        setFlag((prev) => !prev);
        toast.success("Cập nhật sản phẩm thành công");
      } catch (error) {
        console.log("Error Update", error);
        toast.error("Cập nhật sản phẩm thất bại");
      }
    }
  };
  useEffect(() => {
    type === "ADD" &&
      form.setFieldsValue({
        name: "",
        image: "",
        price: "",
        desc: "",
      });
  }, [onOpenModal, type]);
  return (
    <Modal
      open={onOpenModal}
      onCancel={setOpenModal}
      centered
      footer={false}
      title={type === "ADD" ? "Create Product" : "Update Product"}
    >
      <Form
        initialValues={product}
        onFinish={onSubmit}
        form={form}
        labelCol={{ span: 4 }}
        layout="horizontal"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image Url"
          name="image"
          rules={[
            {
              required: true,
              message: "Please input your image!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your price!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desc"
          name="desc"
          rules={[
            {
              required: true,
              message: "Please input your desc!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-800 float-end"
          >
            {type === "ADD" ? "Create" : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalProduct;
