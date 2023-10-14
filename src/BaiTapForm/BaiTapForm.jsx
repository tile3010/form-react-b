import React, { Component } from 'react';
import { connect } from 'react-redux'
import FormSinhVien from './FormSinhVien'
import TableSinhVien from './TableSinhVien'
import SearchSinhVien from './SearchSinhVien';

class BaiTapForm extends Component {
  render() {
      return (
        <div className='container'>
              <FormSinhVien />
              <SearchSinhVien />
              <TableSinhVien />
          </div>
      )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(BaiTapForm)