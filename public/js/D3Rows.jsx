class D3AppRowGroup extends React.Component {
  render() {
    var self = this,
      itemType = self.props.itemType,
      activeCharacters = self.props.activeCharacters,
      expandedItems = self.props.expandedItems,
      filteredItems = self.props.items.filter((y)=>{
        return y.itemType == itemType && activeCharacters.some((z)=> y['is' + z + 'Loot'] == 1);
      }),
      groupHeader = filteredItems.length ? <div className='D3TableContainer-sectionHeader'>{itemType}</div> : null;

    return (
      <div key={D3AppController.generateUUID()}>
        {groupHeader}
        {filteredItems.map((item, i)=>{
            return <D3AppRow expandedItems={expandedItems} item={item} activeCharacters={activeCharacters} key={D3AppController.generateUUID()} />
        })}
      </div>
    )
  }
}

class D3AppRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }
  }
  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }
  render() {
    var self = this,
      item = this.props.item,
      activeCharacters = this.props.activeCharacters,
      determineCharacters = D3AppController.getCharactersByLoot(item),
      handlers = {
        toggleExpand: this.toggleExpand.bind(self)
      };

    if(this.state.expanded) {
      return <D3AppRowContentsExpanded handlers={handlers} item={item} activeCharacters={activeCharacters} determineCharacters={determineCharacters} />
    } else {
      return <D3AppRowContents handlers={handlers} item={item} activeCharacters={activeCharacters} determineCharacters={determineCharacters} />
    }
  }
}
