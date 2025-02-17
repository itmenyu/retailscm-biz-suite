

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'

import DashboardTool from '../../common/Dashboard.tool'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './SupplierProduct.profile.less'
import DescriptionList from '../../components/DescriptionList';

import GlobalComponents from '../../custcomponents';
import PermissionSetting from '../../permission/PermissionSetting'
import appLocaleName from '../../common/Locale.tool'
const { Description } = DescriptionList;
const {defaultRenderExtraHeader}= DashboardTool


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const internalSummaryOf = (supplierProduct,targetComponent) =>{
    const userContext = null
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="Id">{supplierProduct.id}</Description> 
<Description term="Product Name">{supplierProduct.productName}</Description> 
<Description term="Product Description">{supplierProduct.productDescription}</Description> 
<Description term="Product Unit">{supplierProduct.productUnit}</Description> 
	
      </DescriptionList>
	)
}


const renderPermissionSetting = supplierProduct => {
  const {SupplierProductBase} = GlobalComponents
  return <PermissionSetting targetObject={supplierProduct}  targetObjectMeta={SupplierProductBase}/>
}

const internalRenderExtraHeader = defaultRenderExtraHeader

class SupplierProductPermission extends Component {


  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const  supplierProduct = this.props.supplierProduct;
    const { id,displayName, productSupplyDurationCount } = supplierProduct
    const cardsData = {cardsName:"Supplier Product",cardsFor: "supplierProduct",cardsSource: supplierProduct,
  		subItems: [
    
      	],
  	};
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const summaryOf = this.props.summaryOf || internalSummaryOf
   
    return (

      <PageHeaderLayout
        title={`${cardsData.cardsName}: ${displayName}`}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
      {renderExtraHeader(cardsData.cardsSource)}
      {renderPermissionSetting(cardsData.cardsSource)}
      
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  supplierProduct: state._supplierProduct,
}))(Form.create()(SupplierProductPermission))

