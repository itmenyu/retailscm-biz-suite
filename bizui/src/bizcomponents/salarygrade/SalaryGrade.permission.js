

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
import styles from './SalaryGrade.profile.less'
import DescriptionList from '../../components/DescriptionList';

import GlobalComponents from '../../custcomponents';
import PermissionSetting from '../../permission/PermissionSetting'
import appLocaleName from '../../common/Locale.tool'
const { Description } = DescriptionList;
const {defaultRenderExtraHeader}= DashboardTool


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const internalSummaryOf = (salaryGrade,targetComponent) =>{
    const userContext = null
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="Id">{salaryGrade.id}</Description> 
<Description term="Code">{salaryGrade.code}</Description> 
<Description term="Name">{salaryGrade.name}</Description> 
<Description term="Detail Description">{salaryGrade.detailDescription}</Description> 
	
      </DescriptionList>
	)
}


const renderPermissionSetting = salaryGrade => {
  const {SalaryGradeBase} = GlobalComponents
  return <PermissionSetting targetObject={salaryGrade}  targetObjectMeta={SalaryGradeBase}/>
}

const internalRenderExtraHeader = defaultRenderExtraHeader

class SalaryGradePermission extends Component {


  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const  salaryGrade = this.props.salaryGrade;
    const { id,displayName, employeeCount, employeeSalarySheetCount } = salaryGrade
    const cardsData = {cardsName:"Salary Grade",cardsFor: "salaryGrade",cardsSource: salaryGrade,
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
  salaryGrade: state._salaryGrade,
}))(Form.create()(SalaryGradePermission))

