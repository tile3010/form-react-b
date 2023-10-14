const defaultState = {
    sinhVien: {
        maSV: "",
        tenSV: "",
        soDienThoai: "",
        email: "",
    },

    listSinhVien: [
        {
            maSV: "1",
            tenSV: "Nguyễn Tiến A",
            soDienThoai: "0357005566",
            email: "abc@gmail.com",
        },
    ],

    validErr: {
        maSV: "",
        tenSV: "",
        soDienThoai: "",
        email: "",
    },
    searchList: [],
    searchThôngTin: "", 
};

export const QuanLySinhVienReducer = (state = defaultState, action) => {
    switch (action.type) {

        case "HANDLE_INPUT": {
            let { id, value, dataType } = action.payload;
            console.log(id, value);

            let inpSinhVien = { ...state.sinhVien };
            inpSinhVien[id] = value;
            state.sinhVien = inpSinhVien;

            let validError = { ...state.validErr };
            let errMess = "";

            if (value.trim() === "") {
                errMess = "Không để trống phần thông tin này!";
            } else {
                if (dataType === "id") {
                    if (state.listSinhVien.find((sv) => sv.maSV === value)) {
                        errMess = "Mã sinh viên đã tồn tại!";
                    }
                    let regexNumberId = /^[0-9]*$/;
                    if (!regexNumberId.test(value)) {
                        errMess = "Mã sinh viên phải là số!";
                    }
                }

                if (dataType === "name") {
                    let regexName =
                        /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
                    if (!regexName.test(value)) {
                        errMess = "Tên sinh viên không hợp lệ";
                    }
                }

                if (dataType === "email") {
                    let regexMail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
                    if (!regexMail.test(value)) {
                        errMess = "Email không hợp lệ!";
                    }
                }

                if (dataType === "tel") {
                    let regexTel =
                        /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/;
                    if (!regexTel.test(value)) {
                        errMess = "Số điện thoại không hợp lệ!";
                    }
                }
            }

            validError[id] = errMess;
            state.validErr = validError;

            return { ...state };
        }

        case "HANDLE_CREATE": {
            let valid = true;
            let baoLoi = { ...state.validErr };

            for (let key in baoLoi) {
                if (baoLoi[key] !== "") {
                    valid = false;
                    break;
                }
            }

            for (let key in state.sinhVien) {
                if (state.sinhVien[key] === "") {
                    baoLoi[key] = "Thông tin không được để trống!";
                    valid = false;
                }
            }

            // Nếu sinh viên trùng 
            let sinhVienTrung = state.listSinhVien.find(
                (sv) => sv.maSV === state.sinhVien.maSV
            );
            console.log("svtrung", sinhVienTrung);
            if (sinhVienTrung) {
                valid = false;
                baoLoi.maSV = "Thông tin sinh viên trùng lặp!";
            }

            if (!valid) {
                console.log("err", baoLoi);
                state.validErr = baoLoi;
                alert("Dữ liệu không hợp lệ!");
                return { ...state };
            }

            let danhSachUpdate = [...state.listSinhVien];
            danhSachUpdate.push(state.sinhVien);
            state.listSinhVien = danhSachUpdate;
            console.log(valid);
            alert("Thêm thông tin thành công!");
            return { ...state };
        }

        case "HANDLE_DELETE": {
            let { masinhvien } = action.payload;
            let danhSachSinhVienUpdate = [...state.listSinhVien];
            let sinhVienIndex = danhSachSinhVienUpdate.findIndex(
                (sv) => sv.maSV === masinhvien
            );

            danhSachSinhVienUpdate.splice(sinhVienIndex, 1);
            state.listSinhVien = danhSachSinhVienUpdate;
            state.searchList =
                ""; 
            alert("Xóa thông tin sinh viên ?");
            return { ...state };
        }

        case "HANDLE_UPDATE_RENDER": {
            let { sinhvien } = action.payload;
            state.sinhVien = sinhvien;
            console.log(state.sinhVien);
            return { ...state };
        }

        case "HANDLE_UPDATE_SUBMIT": {
            let updateDanhSachSV = [...state.listSinhVien];
            let svIndex = updateDanhSachSV.findIndex(
                (sv) => sv.maSV === state.sinhVien.maSV
            );

            updateDanhSachSV[svIndex] = state.sinhVien;
            state.listSinhVien = updateDanhSachSV;
            alert("Thông tin cập nhật thành công!");
            state.sinhVien = {
                maSV: "",
                tenSV: "",
                email: "",
                soDienThoai: "",
            };
            return { ...state };
        }
        
        case "HANDLE_SEARCH": {
            let { value } = action.payload;
            state.searchThôngTin = value;
            console.log("......", state.searchThôngTin)
            let searchValue = value.trim().toLowerCase();
            let searchArr = [...state.listSinhVien];
            let SearchArrFilter = searchArr.filter(
                (sv) =>
                    sv.tenSV.toLocaleLowerCase().includes(searchValue) ||
                    sv.maSV.includes(searchValue) ||
                    sv.email.toLowerCase().includes(searchValue) ||
                    sv.soDienThoai.includes(searchValue)
            );
            state.searchList = SearchArrFilter;
            return { ...state };
        }

        default:
            return state;
    }
};