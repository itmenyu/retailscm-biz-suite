import React from 'react'
import { Icon,Divider } from 'antd'

import { Link } from 'dva/router'
import moment from 'moment'
import ImagePreview from '../../components/ImagePreview'
import appLocaleName from '../../common/Locale.tool'
import BaseTool from '../../common/Base.tool'
import GlobalComponents from '../../custcomponents'
import DescriptionList from '../../components/DescriptionList'
const { Description } = DescriptionList
const {
	defaultRenderReferenceCell,
	defaultRenderBooleanCell,
	defaultRenderMoneyCell,
	defaultRenderDateTimeCell,
	defaultRenderImageCell,
	defaultRenderDateCell,
	defaultRenderIdentifier,
	defaultRenderTextCell,
} = BaseTool

const renderTextCell=defaultRenderTextCell
const renderIdentifier=defaultRenderIdentifier
const renderDateCell=defaultRenderDateCell
const renderDateTimeCell=defaultRenderDateTimeCell
const renderImageCell=defaultRenderImageCell
const renderMoneyCell=defaultRenderMoneyCell
const renderBooleanCell=defaultRenderBooleanCell
const renderReferenceCell=defaultRenderReferenceCell


const menuData = {menuName:"Occupation Type", menuFor: "occupationType",
  		subItems: [
  {name: 'employeeList', displayName:'Employee', icon:'500px',readPermission: false,createPermission: false,deletePermission: false,updatePermission: false,executionPermission: false, viewGroup: '__no_group'},
  
  		],
}

const fieldLabels = {
  id: 'Id',
  code: 'Code',
  company: 'Company',
  description: 'Description',
  detailDescription: 'Detail Description',

}

const displayColumns = [
  { title: fieldLabels.id, debugtype: 'string', dataIndex: 'id', width: '20', render: (text, record)=>renderTextCell(text,record,'occupationType') , sorter: true },
  { title: fieldLabels.code, debugtype: 'string', dataIndex: 'code', width: '10',render: (text, record)=>renderTextCell(text,record)},
  { title: fieldLabels.company, dataIndex: 'company', render: (text, record) => renderReferenceCell(text, record), sorter:true},
  { title: fieldLabels.description, debugtype: 'string', dataIndex: 'description', width: '11',render: (text, record)=>renderTextCell(text,record)},
  { title: fieldLabels.detailDescription, debugtype: 'string', dataIndex: 'detailDescription', width: '65',render: (text, record)=>renderTextCell(text,record)},

]
// refernce to https://ant.design/components/list-cn/
const renderItemOfList=(occupationType,targetComponent)=>{

	
	
	
	const userContext = null
	return (
	<div key={occupationType.id}>
	
	<DescriptionList  key={occupationType.id} size="small" col="4">
<Description term="Id">{occupationType.id}</Description> 
<Description term="Code">{occupationType.code}</Description> 
<Description term="Description">{occupationType.description}</Description> 
<Description term="Detail Description">{occupationType.detailDescription}</Description> 
	
        
      </DescriptionList>
       <Divider style={{ height: '2px' }} />
      </div>
	)

}
	



const OccupationTypeBase={menuData,displayColumns,fieldLabels,renderItemOfList}
export default OccupationTypeBase



