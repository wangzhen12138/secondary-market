const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  id: state=>state.user.id,
  admin:state=>state.user.admin,
  phone:state=>state.user.phone,
  school:state=>state.user.school,
  emial:state=>state.user.emial,
  wx:state=>state.user.wx,
  isadmin:state=>state.user.isadmin
}
export default getters
