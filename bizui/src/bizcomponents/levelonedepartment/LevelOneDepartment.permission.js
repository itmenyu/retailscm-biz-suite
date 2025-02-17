

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
import styles from './LevelOneDepartment.profile.less'
import DescriptionList from '../../components/DescriptionList';

import GlobalComponents from '../../custcomponents';
import PermissionSetting from '../../permission/PermissionSetting'
import appLocaleName from '../../common/Locale.tool'
const { Description } = DescriptionList;
const {defaultRenderExtraHeader}= DashboardTool


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const internalSummaryOf = (levelOneDepartment,targetComponent) =>{
    const userContext = null
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="Id">{levelOneDepartment.id}</Description> 
<Description term="Name">{levelOneDepartment.name}</Description> 
<Description term="Description">{levelOneDepartment.description}</Description> 
<Description term="Manager">{levelOneDepartment.manager}</Description> 
<Description term="Founded">{ moment(levelOneDepartment.founded).format('YYYY-MM-DD')}</Description> 
	
      </DescriptionList>
	)
}


const renderPermissionSetting = levelOneDepartment => {
  const {LevelOneDepartmentBase} = GlobalComponents
  return <PermissionSetting targetObject={levelOneDepartment}  targetObjectMeta={LevelOneDepartmentBase}/>
}

const internalRenderExtraHeader = defaultRenderExtraHeader

class LevelOneDepartmentPermission extends Component {


  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const  levelOneDepartment = this.props.levelOneDepartment;
    const { id,displayName, levelTwoDepartmentCount } = levelOneDepartment
    const cardsData = {cardsName:"Level One Department",cardsFor: "levelOneDepartment",cardsSource: levelOneDepartment,
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
  levelOneDepartment: state._levelOneDepartment,
}))(Form.create()(LevelOneDepartmentPermission))

