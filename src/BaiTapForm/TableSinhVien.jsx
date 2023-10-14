import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableSinhVien extends Component {
    renderthongtinSinhVien = () => {

        let { thongtinSV, searchList, searchThôngTin } = this.props;

        if (!searchList.length) {
            if (searchThôngTin !== "") {
                return (
                    <tr className="text-center">
                        <td colSpan={5}>Không có kết quả phù hợp!</td>
                    </tr>
                );
            }

            console.log("mangSinhVien", thongtinSV);
            return thongtinSV.map((sinhvien, index) => {
                return (
                    <tr className="text-center" key={index}>
                        <td>{sinhvien.maSV}</td>
                        <td>{sinhvien.tenSV}</td>
                        <td>{sinhvien.soDienThoai}</td>
                        <td>{sinhvien.email}</td>
                        <td>
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => {
                                    const action = {
                                        type: "HANDLE_DELETE",
                                        payload: {
                                            sinhvien: sinhvien,
                                            masinhvien: sinhvien.maSV,
                                        },
                                    };
                                    this.props.dispatch(action);
                                }}>

                                Xóa
                            </button>

                            <button
                                className="btn btn-warning"
                                onClick={() => {
                                    document.getElementById("maSV").disabled = true;
                                    document.getElementById("create_btn").style.display = "none";
                                    document.getElementById("update_btn").style.display = "block";
                                    const action = {
                                        type: "HANDLE_UPDATE_RENDER",
                                        payload: {
                                            sinhvien: sinhvien,
                                            masinhvien: sinhvien.maSV,
                                        },
                                    };
                                    this.props.dispatch(action);
                                }}>
                                Sửa
                            </button>
                        </td>
                    </tr>
                );
            });

        } else {
            
            return searchList.map((sinhvien, index) => {
                return (
                    <tr className="text-center" key={index}>
                        <td>{sinhvien.maSV}</td>
                        <td>{sinhvien.tenSV}</td>
                        <td>{sinhvien.soDienThoai}</td>
                        <td>{sinhvien.email}</td>

                        <td>
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => {
                                    document.getElementById("maSV").disabled = true;
                                    document.getElementById("create_btn").style.display = "none";
                                    document.getElementById("update_btn").style.display = "block";
                                    const action = {
                                        type: "HANDLE_DELETE",
                                        payload: {
                                            sinhvien: sinhvien,
                                            masinhvien: sinhvien.maSV,
                                        },
                                    };
                                    this.props.dispatch(action);
                                }}>
                                Xóa
                            </button>

                            <button
                                className="btn btn-warning"
                                onClick={() => {
                                    const action = {
                                        type: "HANDLE_UPDATE_RENDER",
                                        payload: {
                                            sinhvien: sinhvien,
                                            masinhvien: sinhvien.maSV,
                                        },
                                    };
                                    this.props.dispatch(action);
                                }}>
                                Sửa
                            </button>
                        </td>
                    </tr>
                );
            });
        }
    };

    // Set up giao diện hiển thị 
    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead className=" bg-dark text-white">
                        <tr className="text-center">
                            <th>Mã sinh viên</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Tuỳ chọn</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderthongtinSinhVien()}</tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    thongtinSV: state.QuanLySinhVienReducer.listSinhVien,
    searchList: state.QuanLySinhVienReducer.searchList,
    searchThôngTin: state.QuanLySinhVienReducer.searchThôngTin,
});

export default connect(mapStateToProps)(TableSinhVien);