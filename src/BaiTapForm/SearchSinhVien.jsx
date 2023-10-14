import React, { Component } from "react";
import { connect } from "react-redux";

class SearchSinhVien extends Component {

    searchFunction = (e) => {
        let { value } = e.target;
        if (value === "") {
            value = ""
        }

        const action = {
            type: "HANDLE_SEARCH",
            payload: {
                value: value
            },
        };
        this.props.dispatch(action);

    };

    // Render thông tin 
    render() {
        return (
            <div className="container mt-5">
                <div className="d-flex mx-auto">
                    <input
                        className="form-control"
                        placeholder="Tìm kiếm"
                        type="text"
                        name=""
                        id="search_bar"
                        onChange={this.searchFunction}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    danhSach: state.QuanLySinhVienReducer.listSinhVien
});

export default connect(mapStateToProps)(SearchSinhVien);