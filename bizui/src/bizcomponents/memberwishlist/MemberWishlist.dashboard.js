

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './MemberWishlist.dashboard.less'
import DescriptionList from '../../components/DescriptionList';
import ImagePreview from '../../components/ImagePreview';
import GlobalComponents from '../../custcomponents';
import DashboardTool from '../../common/Dashboard.tool'
import appLocaleName from '../../common/Locale.tool'

const {aggregateDataset,calcKey, defaultHideCloseTrans,
  defaultImageListOf,defaultSettingListOf,defaultBuildTransferModal,
  defaultExecuteTrans,defaultHandleTransferSearch,defaultShowTransferModel,
  defaultRenderExtraHeader,
  defaultSubListsOf,defaultRenderAnalytics,
  defaultRenderExtraFooter,renderForTimeLine,renderForNumbers,
  defaultQuickFunctions, defaultRenderSubjectList,
}= DashboardTool



const { Description } = DescriptionList;
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select


const imageList =(memberWishlist)=>{return [
	 ]}

const internalImageListOf = (memberWishlist) =>defaultImageListOf(memberWishlist,imageList)

const optionList =(memberWishlist)=>{return [ 
	]}

const buildTransferModal = defaultBuildTransferModal
const showTransferModel = defaultShowTransferModel
const internalRenderSubjectList = defaultRenderSubjectList
const internalSettingListOf = (memberWishlist) =>defaultSettingListOf(memberWishlist, optionList)
const internalLargeTextOf = (memberWishlist) =>{

	return null
	

}


const internalRenderExtraHeader = defaultRenderExtraHeader

const internalRenderExtraFooter = defaultRenderExtraFooter
const internalSubListsOf = defaultSubListsOf


const internalRenderTitle = (cardsData,targetComponent) =>{
  
  
  const linkComp=cardsData.returnURL?<Link to={cardsData.returnURL}> <FontAwesome name="arrow-left"  /> </Link>:null
  return (<div>{linkComp}{cardsData.cardsName}: {cardsData.displayName}</div>)

}


const internalSummaryOf = (memberWishlist,targetComponent) =>{
	
	
	const {MemberWishlistService} = GlobalComponents
	const userContext = null
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="Id">{memberWishlist.id}</Description> 
<Description term="Name">{memberWishlist.name}</Description> 
<Description term="Owner">{memberWishlist.owner==null?appLocaleName(userContext,"NotAssigned"):`${memberWishlist.owner.displayName}(${memberWishlist.owner.id})`}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"Owner","retailStoreMember",MemberWishlistService.requestCandidateOwner,
	      MemberWishlistService.transferToAnotherOwner,"anotherOwnerId",memberWishlist.owner?memberWishlist.owner.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
	
        {buildTransferModal(memberWishlist,targetComponent)}
      </DescriptionList>
	)

}

const internalQuickFunctions = defaultQuickFunctions

class MemberWishlistDashboard extends Component {

 state = {
    transferModalVisiable: false,
    candidateReferenceList: {},
    candidateServiceName:"",
    candidateObjectType:"city",
    targetLocalName:"",
    transferServiceName:"",
    currentValue:"",
    transferTargetParameterName:"",  
    defaultType: 'memberWishlist'


  }
  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const { id,displayName, memberWishlistProductListMetaInfo, memberWishlistProductCount } = this.props.memberWishlist
    if(!this.props.memberWishlist.class){
      return null
    }
    const returnURL = this.props.returnURL
    
    const cardsData = {cardsName:"Member Wishlist",cardsFor: "memberWishlist",
    	cardsSource: this.props.memberWishlist,returnURL,displayName,
  		subItems: [
{name: 'memberWishlistProductList', displayName:'Member Wishlist Product',type:'memberWishlistProduct',count:memberWishlistProductCount,addFunction: true, role: 'memberWishlistProduct', metaInfo: memberWishlistProductListMetaInfo, renderItem: GlobalComponents.MemberWishlistProductBase.renderItemOfList},
    
      	],
  	};
    
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const settingListOf = this.props.settingListOf || internalSettingListOf
    const imageListOf = this.props.imageListOf || internalImageListOf
    const subListsOf = this.props.subListsOf || internalSubListsOf
    const largeTextOf = this.props.largeTextOf ||internalLargeTextOf
    const summaryOf = this.props.summaryOf || internalSummaryOf
    const renderTitle = this.props.renderTitle || internalRenderTitle
    const renderExtraFooter = this.props.renderExtraFooter || internalRenderExtraFooter
    const renderAnalytics = this.props.renderAnalytics || defaultRenderAnalytics
    const quickFunctions = this.props.quickFunctions || internalQuickFunctions
    const renderSubjectList = this.props.renderSubjectList || internalRenderSubjectList
    
    return (

      <PageHeaderLayout
        title={renderTitle(cardsData,this)}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
       
        {renderExtraHeader(cardsData.cardsSource)}
        {quickFunctions(cardsData)} 
        {renderAnalytics(cardsData.cardsSource)}
        {settingListOf(cardsData.cardsSource)}
        {imageListOf(cardsData.cardsSource)}  
        {renderSubjectList(cardsData)}       
        {largeTextOf(cardsData.cardsSource)}
        {renderExtraFooter(cardsData.cardsSource)}
  		
      </PageHeaderLayout>
    
    )
  }
}

export default connect(state => ({
  memberWishlist: state._memberWishlist,
  returnURL: state.breadcrumb.returnURL,
  
}))(Form.create()(MemberWishlistDashboard))

