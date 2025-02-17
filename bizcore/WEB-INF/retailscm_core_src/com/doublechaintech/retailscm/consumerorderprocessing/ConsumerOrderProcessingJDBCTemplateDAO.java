
package com.doublechaintech.retailscm.consumerorderprocessing;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;
import java.math.BigDecimal;
import com.doublechaintech.retailscm.RetailscmNamingServiceDAO;
import com.doublechaintech.retailscm.BaseEntity;
import com.doublechaintech.retailscm.SmartList;
import com.doublechaintech.retailscm.AccessKey;
import com.doublechaintech.retailscm.DateKey;
import com.doublechaintech.retailscm.StatsInfo;
import com.doublechaintech.retailscm.StatsItem;

import com.doublechaintech.retailscm.MultipleAccessKey;
import com.doublechaintech.retailscm.RetailscmUserContext;






import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowCallbackHandler;


public class ConsumerOrderProcessingJDBCTemplateDAO extends RetailscmNamingServiceDAO implements ConsumerOrderProcessingDAO{


			
		

	
	/*
	protected ConsumerOrderProcessing load(AccessKey accessKey,Map<String,Object> options) throws Exception{
		return loadInternalConsumerOrderProcessing(accessKey, options);
	}
	*/
	
	protected String getIdFormat()
	{
		return getShortName(this.getName())+"%06d";
	}
	
	public ConsumerOrderProcessing load(String id,Map<String,Object> options) throws Exception{
		return loadInternalConsumerOrderProcessing(ConsumerOrderProcessingTable.withId(id), options);
	}
	
	
	
	public ConsumerOrderProcessing save(ConsumerOrderProcessing consumerOrderProcessing,Map<String,Object> options){
		
		String methodName="save(ConsumerOrderProcessing consumerOrderProcessing,Map<String,Object> options)";
		
		assertMethodArgumentNotNull(consumerOrderProcessing, methodName, "consumerOrderProcessing");
		assertMethodArgumentNotNull(options, methodName, "options");
		
		return saveInternalConsumerOrderProcessing(consumerOrderProcessing,options);
	}
	public ConsumerOrderProcessing clone(String consumerOrderProcessingId, Map<String,Object> options) throws Exception{
	
		return clone(ConsumerOrderProcessingTable.withId(consumerOrderProcessingId),options);
	}
	
	protected ConsumerOrderProcessing clone(AccessKey accessKey, Map<String,Object> options) throws Exception{
	
		String methodName="clone(String consumerOrderProcessingId,Map<String,Object> options)";
		
		assertMethodArgumentNotNull(accessKey, methodName, "accessKey");
		assertMethodArgumentNotNull(options, methodName, "options");
		
		ConsumerOrderProcessing newConsumerOrderProcessing = loadInternalConsumerOrderProcessing(accessKey, options);
		newConsumerOrderProcessing.setVersion(0);
		
		

		
		saveInternalConsumerOrderProcessing(newConsumerOrderProcessing,options);
		
		return newConsumerOrderProcessing;
	}
	
	
	
	

	protected void throwIfHasException(String consumerOrderProcessingId,int version,int count) throws Exception{
		if (count == 1) {
			throw new ConsumerOrderProcessingVersionChangedException(
					"The object version has been changed, please reload to delete");
		}
		if (count < 1) {
			throw new ConsumerOrderProcessingNotFoundException(
					"The " + this.getTableName() + "(" + consumerOrderProcessingId + ") has already been deleted.");
		}
		if (count > 1) {
			throw new IllegalStateException(
					"The table '" + this.getTableName() + "' PRIMARY KEY constraint has been damaged, please fix it.");
		}
	}
	
	
	public void delete(String consumerOrderProcessingId, int version) throws Exception{
	
		String methodName="delete(String consumerOrderProcessingId, int version)";
		assertMethodArgumentNotNull(consumerOrderProcessingId, methodName, "consumerOrderProcessingId");
		assertMethodIntArgumentGreaterThan(version,0, methodName, "options");
		
	
		String SQL=this.getDeleteSQL();
		Object [] parameters=new Object[]{consumerOrderProcessingId,version};
		int affectedNumber = singleUpdate(SQL,parameters);
		if(affectedNumber == 1){
			return ; //Delete successfully
		}
		if(affectedNumber == 0){
			handleDeleteOneError(consumerOrderProcessingId,version);
		}
		
	
	}
	
	
	
	
	

	public ConsumerOrderProcessing disconnectFromAll(String consumerOrderProcessingId, int version) throws Exception{
	
		
		ConsumerOrderProcessing consumerOrderProcessing = loadInternalConsumerOrderProcessing(ConsumerOrderProcessingTable.withId(consumerOrderProcessingId), emptyOptions());
		consumerOrderProcessing.clearFromAll();
		this.saveConsumerOrderProcessing(consumerOrderProcessing);
		return consumerOrderProcessing;
		
	
	}
	
	@Override
	protected String[] getNormalColumnNames() {

		return ConsumerOrderProcessingTable.NORMAL_CLOUMNS;
	}
	@Override
	protected String getName() {
		
		return "consumer_order_processing";
	}
	@Override
	protected String getBeanName() {
		
		return "consumerOrderProcessing";
	}
	
	
	
	
	
	protected boolean checkOptions(Map<String,Object> options, String optionToCheck){
	
 		return ConsumerOrderProcessingTokens.checkOptions(options, optionToCheck);
	
	}


		

	

	protected ConsumerOrderProcessingMapper getConsumerOrderProcessingMapper(){
		return new ConsumerOrderProcessingMapper();
	}

	
	
	protected ConsumerOrderProcessing extractConsumerOrderProcessing(AccessKey accessKey, Map<String,Object> loadOptions) throws Exception{
		try{
			ConsumerOrderProcessing consumerOrderProcessing = loadSingleObject(accessKey, getConsumerOrderProcessingMapper());
			return consumerOrderProcessing;
		}catch(EmptyResultDataAccessException e){
			throw new ConsumerOrderProcessingNotFoundException("ConsumerOrderProcessing("+accessKey+") is not found!");
		}

	}

	
	

	protected ConsumerOrderProcessing loadInternalConsumerOrderProcessing(AccessKey accessKey, Map<String,Object> loadOptions) throws Exception{
		
		ConsumerOrderProcessing consumerOrderProcessing = extractConsumerOrderProcessing(accessKey, loadOptions);

		
		return consumerOrderProcessing;
		
	}

	
		
		
 	
		
		
		

	

	protected ConsumerOrderProcessing saveConsumerOrderProcessing(ConsumerOrderProcessing  consumerOrderProcessing){
		
		if(!consumerOrderProcessing.isChanged()){
			return consumerOrderProcessing;
		}
		
		
		String SQL=this.getSaveConsumerOrderProcessingSQL(consumerOrderProcessing);
		//FIXME: how about when an item has been updated more than MAX_INT?
		Object [] parameters = getSaveConsumerOrderProcessingParameters(consumerOrderProcessing);
		int affectedNumber = singleUpdate(SQL,parameters);
		if(affectedNumber != 1){
			throw new IllegalStateException("The save operation should return value = 1, while the value = "
				+ affectedNumber +"If the value = 0, that mean the target record has been updated by someone else!");
		}
		
		consumerOrderProcessing.incVersion();
		return consumerOrderProcessing;
	
	}
	public SmartList<ConsumerOrderProcessing> saveConsumerOrderProcessingList(SmartList<ConsumerOrderProcessing> consumerOrderProcessingList,Map<String,Object> options){
		//assuming here are big amount objects to be updated.
		//First step is split into two groups, one group for update and another group for create
		Object [] lists=splitConsumerOrderProcessingList(consumerOrderProcessingList);
		
		batchConsumerOrderProcessingCreate((List<ConsumerOrderProcessing>)lists[CREATE_LIST_INDEX]);
		
		batchConsumerOrderProcessingUpdate((List<ConsumerOrderProcessing>)lists[UPDATE_LIST_INDEX]);
		
		
		//update version after the list successfully saved to database;
		for(ConsumerOrderProcessing consumerOrderProcessing:consumerOrderProcessingList){
			if(consumerOrderProcessing.isChanged()){
				consumerOrderProcessing.incVersion();
			}
			
		
		}
		
		
		return consumerOrderProcessingList;
	}

	public SmartList<ConsumerOrderProcessing> removeConsumerOrderProcessingList(SmartList<ConsumerOrderProcessing> consumerOrderProcessingList,Map<String,Object> options){
		
		
		super.removeList(consumerOrderProcessingList, options);
		
		return consumerOrderProcessingList;
		
		
	}
	
	protected List<Object[]> prepareConsumerOrderProcessingBatchCreateArgs(List<ConsumerOrderProcessing> consumerOrderProcessingList){
		
		List<Object[]> parametersList=new ArrayList<Object[]>();
		for(ConsumerOrderProcessing consumerOrderProcessing:consumerOrderProcessingList ){
			Object [] parameters = prepareConsumerOrderProcessingCreateParameters(consumerOrderProcessing);
			parametersList.add(parameters);
		
		}
		return parametersList;
		
	}
	protected List<Object[]> prepareConsumerOrderProcessingBatchUpdateArgs(List<ConsumerOrderProcessing> consumerOrderProcessingList){
		
		List<Object[]> parametersList=new ArrayList<Object[]>();
		for(ConsumerOrderProcessing consumerOrderProcessing:consumerOrderProcessingList ){
			if(!consumerOrderProcessing.isChanged()){
				continue;
			}
			Object [] parameters = prepareConsumerOrderProcessingUpdateParameters(consumerOrderProcessing);
			parametersList.add(parameters);
		
		}
		return parametersList;
		
	}
	protected void batchConsumerOrderProcessingCreate(List<ConsumerOrderProcessing> consumerOrderProcessingList){
		String SQL=getCreateSQL();
		List<Object[]> args=prepareConsumerOrderProcessingBatchCreateArgs(consumerOrderProcessingList);
		
		int affectedNumbers[] = batchUpdate(SQL, args);
		
	}
	
	
	protected void batchConsumerOrderProcessingUpdate(List<ConsumerOrderProcessing> consumerOrderProcessingList){
		String SQL=getUpdateSQL();
		List<Object[]> args=prepareConsumerOrderProcessingBatchUpdateArgs(consumerOrderProcessingList);
		
		int affectedNumbers[] = batchUpdate(SQL, args);
		
		
		
	}
	
	
	
	static final int CREATE_LIST_INDEX=0;
	static final int UPDATE_LIST_INDEX=1;
	
	protected Object[] splitConsumerOrderProcessingList(List<ConsumerOrderProcessing> consumerOrderProcessingList){
		
		List<ConsumerOrderProcessing> consumerOrderProcessingCreateList=new ArrayList<ConsumerOrderProcessing>();
		List<ConsumerOrderProcessing> consumerOrderProcessingUpdateList=new ArrayList<ConsumerOrderProcessing>();
		
		for(ConsumerOrderProcessing consumerOrderProcessing: consumerOrderProcessingList){
			if(isUpdateRequest(consumerOrderProcessing)){
				consumerOrderProcessingUpdateList.add( consumerOrderProcessing);
				continue;
			}
			consumerOrderProcessingCreateList.add(consumerOrderProcessing);
		}
		
		return new Object[]{consumerOrderProcessingCreateList,consumerOrderProcessingUpdateList};
	}
	
	protected boolean isUpdateRequest(ConsumerOrderProcessing consumerOrderProcessing){
 		return consumerOrderProcessing.getVersion() > 0;
 	}
 	protected String getSaveConsumerOrderProcessingSQL(ConsumerOrderProcessing consumerOrderProcessing){
 		if(isUpdateRequest(consumerOrderProcessing)){
 			return getUpdateSQL();
 		}
 		return getCreateSQL();
 	}
 	
 	protected Object[] getSaveConsumerOrderProcessingParameters(ConsumerOrderProcessing consumerOrderProcessing){
 		if(isUpdateRequest(consumerOrderProcessing) ){
 			return prepareConsumerOrderProcessingUpdateParameters(consumerOrderProcessing);
 		}
 		return prepareConsumerOrderProcessingCreateParameters(consumerOrderProcessing);
 	}
 	protected Object[] prepareConsumerOrderProcessingUpdateParameters(ConsumerOrderProcessing consumerOrderProcessing){
 		Object[] parameters = new Object[5];
 
 		parameters[0] = consumerOrderProcessing.getWho();
 		parameters[1] = consumerOrderProcessing.getProcessTime();		
 		parameters[2] = consumerOrderProcessing.nextVersion();
 		parameters[3] = consumerOrderProcessing.getId();
 		parameters[4] = consumerOrderProcessing.getVersion();
 				
 		return parameters;
 	}
 	protected Object[] prepareConsumerOrderProcessingCreateParameters(ConsumerOrderProcessing consumerOrderProcessing){
		Object[] parameters = new Object[3];
		String newConsumerOrderProcessingId=getNextId();
		consumerOrderProcessing.setId(newConsumerOrderProcessingId);
		parameters[0] =  consumerOrderProcessing.getId();
 
 		parameters[1] = consumerOrderProcessing.getWho();
 		parameters[2] = consumerOrderProcessing.getProcessTime();		
 				
 		return parameters;
 	}
 	
	protected ConsumerOrderProcessing saveInternalConsumerOrderProcessing(ConsumerOrderProcessing consumerOrderProcessing, Map<String,Object> options){
		
		saveConsumerOrderProcessing(consumerOrderProcessing);

		
		return consumerOrderProcessing;
		
	}
	
	
	
	//======================================================================================
	

	

		

	public ConsumerOrderProcessing present(ConsumerOrderProcessing consumerOrderProcessing,Map<String, Object> options){
	

		return consumerOrderProcessing;
	
	}
		

	

	protected String getTableName(){
		return ConsumerOrderProcessingTable.TABLE_NAME;
	}
	
	
	
	public void enhanceList(List<ConsumerOrderProcessing> consumerOrderProcessingList) {		
		this.enhanceListInternal(consumerOrderProcessingList, this.getConsumerOrderProcessingMapper());
	}
	
	
	
	@Override
	public void collectAndEnhance(BaseEntity ownerEntity) {
		List<ConsumerOrderProcessing> consumerOrderProcessingList = ownerEntity.collectRefsWithType(ConsumerOrderProcessing.INTERNAL_TYPE);
		this.enhanceList(consumerOrderProcessingList);
		
	}
	
	@Override
	public SmartList<ConsumerOrderProcessing> findConsumerOrderProcessingWithKey(MultipleAccessKey key,
			Map<String, Object> options) {
		
  		return queryWith(key, options, getConsumerOrderProcessingMapper());

	}
	@Override
	public int countConsumerOrderProcessingWithKey(MultipleAccessKey key,
			Map<String, Object> options) {
		
  		return countWith(key, options);

	}
	public Map<String, Integer> countConsumerOrderProcessingWithGroupKey(String groupKey, MultipleAccessKey filterKey,
			Map<String, Object> options) {
			
  		return countWithGroup(groupKey, filterKey, options);

	}
	
	@Override
	public SmartList<ConsumerOrderProcessing> queryList(String sql, Object... parameters) {
	    return this.queryForList(sql, parameters, this.getConsumerOrderProcessingMapper());
	}
	
	
    
	public Map<String, Integer> countBySql(String sql, Object[] params) {
		if (params == null || params.length == 0) {
			return new HashMap<>();
		}
		List<Map<String, Object>> result = this.getJdbcTemplateObject().queryForList(sql, params);
		if (result == null || result.isEmpty()) {
			return new HashMap<>();
		}
		Map<String, Integer> cntMap = new HashMap<>();
		for (Map<String, Object> data : result) {
			String key = (String) data.get("id");
			Number value = (Number) data.get("count");
			cntMap.put(key, value.intValue());
		}
		this.logSQLAndParameters("countBySql", sql, params, cntMap.size() + " Counts");
		return cntMap;
	}

	public Integer singleCountBySql(String sql, Object[] params) {
		Integer cnt = this.getJdbcTemplateObject().queryForObject(sql, params, Integer.class);
		logSQLAndParameters("singleCountBySql", sql, params, cnt + "");
		return cnt;
	}

	public BigDecimal summaryBySql(String sql, Object[] params) {
		BigDecimal cnt = this.getJdbcTemplateObject().queryForObject(sql, params, BigDecimal.class);
		logSQLAndParameters("summaryBySql", sql, params, cnt + "");
		return cnt == null ? BigDecimal.ZERO : cnt;
	}

	public <T> List<T> queryForList(String sql, Object[] params, Class<T> claxx) {
		List<T> result = this.getJdbcTemplateObject().queryForList(sql, params, claxx);
		logSQLAndParameters("queryForList", sql, params, result.size() + " items");
		return result;
	}

	public Map<String, Object> queryForMap(String sql, Object[] params) throws DataAccessException {
		Map<String, Object> result = null;
		try {
			result = this.getJdbcTemplateObject().queryForMap(sql, params);
		} catch (org.springframework.dao.EmptyResultDataAccessException e) {
			// 空结果，返回null
		}
		logSQLAndParameters("queryForObject", sql, params, result == null ? "not found" : String.valueOf(result));
		return result;
	}

	public <T> T queryForObject(String sql, Object[] params, Class<T> claxx) throws DataAccessException {
		T result = null;
		try {
			result = this.getJdbcTemplateObject().queryForObject(sql, params, claxx);
		} catch (org.springframework.dao.EmptyResultDataAccessException e) {
			// 空结果，返回null
		}
		logSQLAndParameters("queryForObject", sql, params, result == null ? "not found" : String.valueOf(result));
		return result;
	}

	public List<Map<String, Object>> queryAsMapList(String sql, Object[] params) {
		List<Map<String, Object>> result = getJdbcTemplateObject().queryForList(sql, params);
		logSQLAndParameters("queryAsMapList", sql, params, result.size() + " items");
		return result;
	}

	public synchronized int updateBySql(String sql, Object[] params) {
		int result = getJdbcTemplateObject().update(sql, params);
		logSQLAndParameters("updateBySql", sql, params, result + " items");
		return result;
	}

	public void execSqlWithRowCallback(String sql, Object[] args, RowCallbackHandler callback) {
		getJdbcTemplateObject().query(sql, args, callback);
	}

	public void executeSql(String sql) {
		logSQLAndParameters("executeSql", sql, new Object[] {}, "");
		getJdbcTemplateObject().execute(sql);
	}


}


