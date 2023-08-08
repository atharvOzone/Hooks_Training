// import { toaster } from "@redux/features/common/commonSlice";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const useRegionDelete = (deleteMutation: Function) => {
    
//     const [setDeleteRegion, deleteRegionResponse] = deleteMutation;
//     const dispatch = useDispatch();

//     const deleteRegionWithToaster = (_event, rowData) => {
//         setDeleteRegion({id: rowData?.expandData?.id});
//     }

//     useEffect(() => {
//         if (deleteRegionResponse?.isSuccess) {
//             dispatch(
//                 toaster({
//                     showToaster: true,
//                     statusToaster: 'SUCCESS',
//                     toasterContent: 'Region Deleted Successfully!'
//                 })
//             );
//         }
//     }, [deleteRegionResponse])

//     return deleteRegionWithToaster;
// };

// export default useRegionDelete;

// import {
//     useDeleteRegionMutation,
//     useFetchRegionQuery,
//     useEnableRegionsMutation,
//   } from '@redux/services/region/regionService';
//   import { useEffect, useState } from 'react';
//   import { addRegionList } from '@redux/features/region/regionSlice';
//   import { useAppPersistDispatch } from '@redux/hooks';
//   import './scss/__RegionList.scss';
//   import EditIcon from '@ozonenpm/z-common-ui/img/edit-2.svg';
//   import GenerateTableData from '@ozonenpm/z-common-ui/tool/generateTableData';
//   import Table from '@ozonenpm/z-common-ui/components/table/table';
//   import ToggleSwitch from '@ozonenpm/z-common-ui/components/toggleSwitch/toggleswitch';
//   import EditRegion from './createRegion/editRegion';
//   import Subheader from '@pagecomponents/subheader/Subheader';
//   import CreateRegion from './createRegion/createRegion';
//   import { toaster } from '@redux/features/common/commonSlice';
//   import i18n from '@ozonenpm/z-common-ui/i18n/i18n';
//   import useRegionDelete from './useRegionDelete';
//   const RegionList = () => {
//     const dispatch = useAppPersistDispatch();
//     const [totalCount, setTotalCount] = useState(5);
//     const [enableState, setEnableState] = useState(true);
//     const [show, setShow] = useState(false);
//     const [showCreate, setShowCreate] = useState(false);
//     const [regionData, setRegionData] = useState({});
//     const [cpData, setCpData] = useState('');
  
//     const [paginationData, setPaginationData] = useState({
//       start: 0,
//       end: 10,
//       order: 'DESC',
//       sort: 'id',
//       totalPage: 5,
//       currentPage: 1,
//       name: '',
//       enabled: '',
//       range: [0, 10],
//     });
//     const RegionListResponse = useFetchRegionQuery(paginationData);
//     // const [setDeleteRegionPayload, DeleteRegionResponse] =
//     //   useDeleteRegionMutation();
//     const deleteMutation = useDeleteRegionMutation();
//     const deleteRegionWithToaster = useRegionDelete(deleteMutation);
//     const [setEnableRegions, EnableRegionsResponse] = useEnableRegionsMutation();
  
//     useEffect(() => {
//       console.log(RegionListResponse?.data)
//     }, [RegionListResponse])
  
//     // useEffect(() => {
//     //   if (DeleteRegionResponse.isSuccess) {
//     //     dispatch(
//     //       toaster({
//     //         showToaster: true,
//     //         statusToaster: 'SUCCESS',
//     //         toasterContent: i18n('deleteRegionSuccess'),
//     //       }),
//     //     );
//     //   }
//     // }, [DeleteRegionResponse]);
  
//     useEffect(() => {
//       if(EnableRegionsResponse?.isSuccess) {
//         dispatch(
//           toaster({
//             showToaster: true,
//             statusToaster: 'SUCCESS',
//             toasterContent: 'Disabled Region Succesfully!'
//           }),
//         );
//       }
//     }, [EnableRegionsResponse])
//     const [hasMore, setHasMore] = useState(true);
//     /** @function
//      * @description function to fetch more data on scoll
//      */
//     const fetchMoreData = () => {
//       setPaginationData((prevState) => {
//         return {
//           ...prevState,
//           end: prevState.end + 20,
//           range: [prevState.start, prevState.end + 20],
//         };
//       });
//       RegionListResponse.isSuccess && RegionListResponse.refetch();
//     };
//     /** @function
//      * @description function to handle on change functionality of toggle in the specific region row
//      */
//     const handlechange = (e: any, regionId: string) => {
//       setEnableState(e.target.checked);
//     };
//     /** @function
//      * @description function to handle Toggle state of specific region row
//      */
//     const callback = (
//       _event: React.SyntheticEvent,
//       rowData: any,
//       _rowIndex: number,
//     ) => {
//       return (
//         <ToggleSwitch
//           onChange={(e) => {
//             handlechange(e, rowData?.expandData?.id);
//           }}
//           toggleType='simpleToggle'
//           preText='Quick Setup'
//           postText='Custom'
//           checked={rowData?.expandData?.enabled}
//           disabled={true}
//         ></ToggleSwitch>
//       );
//     };
//     /** @function
//      * @description Edit a Region
//      */
//     const editCallback = (_event: React.SyntheticEvent, rowData: any) => {
//       //implement edit
//       setRegionData(rowData?.expandData);
//       setShow(true);
//     };
  
//     const enableCallback = (event: React.SyntheticEvent, rowData: any) => {
//       console.log(!rowData?.expandData?.enabled);
//       setEnableRegions({ id: rowData?.expandData?.id, enabled: !rowData?.expandData?.enabled})
//     }
  
//     const deleteCallback = (_event: React.SyntheticEvent, rowData: any) => {
//       deleteRegionWithToaster(_event, rowData);
//     };
  
//     /**
//      * handles and updates the pagination data as the search bar changes in the sub header section
//      * @param {object} event
//      */
//     const handleSearchCallback = (event: object) => {
//       if (event.target.value.length >= 1) {
//         dispatch(addRegionList({ list: [] }));
//         setPaginationData((prevState) => {
//           return {
//             ...prevState,
//             name: event.target.value,
//           };
//         });
//       } else {
//         if (paginationData.name != '') {
//           dispatch(addRegionList({ list: [] }));
//           setPaginationData((prevState) => {
//             return { ...prevState, name: '' };
//           });
//         }
//       }
//     };
  
//     const ColList: any = [
//       {
//         name: 'Name',
//         storedvalue: 'name',
//         sort: false,
//         hidden: false,
//         editable: false,
//         component: 'description',
//       },
//       {
//         name: 'Description',
//         storedvalue: 'description',
//         sort: false,
//         hidden: false,
//         editable: false,
//         component: 'label',
//       },
//       {
//         name: 'Default ControlPlane url',
//         storedvalue: 'default_control_plane_url',
//         sort: false,
//         hidden: false,
//         editable: false,
//         component: 'link',
//       },
//       {
//         name: 'Actions',
//         component: 'kebabmenu',
//         options: [
//           { name: 'Edit', callback: editCallback },
//           {
//             name: 'Delete',
//             callback: deleteCallback,
//           },
//           {
//             name: 'Disable',
//             callback: enableCallback,
//           },
//         ],
//       },
//       {
//         component: 'customApi',
//         storedvalue: 'stand_alone_deploymentt',
//         sort: true,
//         hidden: false,
//         editable: false,
//         callback: callback,
//         id: 'Triggers_ToggleSchedule',
//       },
//     ];
//     const [data, setData] = useState<object>(
//       GenerateTableData(ColList, RegionListResponse?.data?.data, 'hidden'),
//     );
  
//     /** @function
//      * @description function to handle updated data when there is a change in the Regions List
//      */
//     useEffect(() => {
//       if (RegionListResponse.isSuccess) {
//         dispatch(addRegionList(RegionListResponse?.data?.data));
  
//         setTotalCount(RegionListResponse?.data?.totalCount);
//         setData(
//           GenerateTableData(ColList, RegionListResponse?.data?.data, 'hidden'),
//         );
//         setHasMore(
//           RegionListResponse?.data?.totalCount > paginationData.end &&
//             RegionListResponse?.data?.totalCount != 0,
//         );
//       }
//     }, [RegionListResponse?.data?.data]);
  
//     return (
//       <>
//         <Subheader
//           navigation={{ text: 'Regions', flag: false }}
//           searchBar={{ onChange: handleSearchCallback, id: 'Regions_searchbar' }}
//           bluebutton={{
//             type: 'add',
//             text: 'Create',
//             id: 'Region_Create',
//             click: () => {
//               // implement create
//               setShowCreate(true);
//             },
//           }}
//         />
//         <div className='Z-RegionList'>
//           <Table
//             data={data}
//             totalCount={totalCount}
//             className='totalCountCard'
//             skeleton={
//               RegionListResponse.isFetching || RegionListResponse.isLoading
//             }
//             lazyloading={true}
//             fetchMoreData={fetchMoreData}
//             hasMore={hasMore}
//             height='50vh'
//           />
//           {show && <EditRegion show={show} setShow={setShow} data={regionData} />}
//           {showCreate && (
//             <CreateRegion show={showCreate} setShow={setShowCreate} />
//           )}
//         </div>
//       </>
//     );
//   };
  
//   export default RegionList;
  
  