class D3App extends React.Component {
  //getInitialState
  constructor(props) {
    super(props);

    this.state = {
      columnHeadersActive: false,
      activeClass: D3AppModel.activeCharacters,
      currentSearch: D3AppModel.searchCache,
      itemTypes: [],
      selectedType: 'all',
      currentPage: 1
    }
  }
  componentDidMount() {
    var self = this,
      types = self.props.items.map((x)=> x.itemType);

    SPS.on('d3app:setTypes', function() {
      self.setState({ itemTypes: D3AppModel.itemTypes });
    }).on('d3app:changeType', function(newType) {
      self.setState({ selectedType: newType });
    }).on('d3app:searchUpdated', function() {
      self.setState({ currentSearch: D3AppModel.searchCache });
      self.setState({ currentPage: 1 });
    }).on('d3app:characterUpdated', function() {
      self.setState({ activeClass: D3AppModel.activeCharacters });
      self.setState({ currentPage: 1 });
    }).on('d3app:changePage', function(pageNum) {
      self.setState({ currentPage: pageNum });
    });

    D3AppController.getItemTypes(types);
  }
  render() {
    var self = this,
      perPage = 30,
      selectedType = self.state.selectedType,
      activeCharacters = self.state.activeClass,
      allItems = self.props.items,
      filteredItems = [],
      items = [],
      totalPages,
      paginator = null,
      currentItemIndex = (self.state.currentPage - 1) * 20,
      currentPage = +(self.state.currentPage);

      if(selectedType != 'all') {
        filteredItems = allItems.filter((x) => {
          var isSelected = x.itemType == selectedType,
            matchesChars = activeCharacters.some((y)=> {
              return x['is' + y + 'Loot'] == 1;
            });

          return isSelected && activeCharacters;
        });
      } else {
        filteredItems = allItems.filter((x) => {
          return activeCharacters.some((y)=> {
            return x['is' + y + 'Loot'] == 1;
          });
        });
      }

      if(self.state.currentSearch) {
        filteredItems = allItems.filter((x)=> {
          var regex = new RegExp(self.state.currentSearch, 'ig');
          return x.itemName.match(regex) || x.typeName.match(regex);
        })
      }

      totalPages = Math.floor(filteredItems.length / perPage) + (filteredItems.length % perPage ? 1 : 0);
      if(selectedType == 'all') {
        paginator = <D3Paginator currentPage={currentPage} totalPages={totalPages}  />;
        items = filteredItems.slice(currentItemIndex, currentItemIndex + perPage);
      } else {
        items = filteredItems;
      }

    return (
      <div>
        <D3AppControlPanel activeCharacters={activeCharacters} selectedType={this.state.selectedType} itemTypes={this.state.itemTypes} />
        <div className="D3TableContainer-tableHeaders">
          <div className="row">
            <div className="three columns D3TableContainer-columnHeader">Item</div>
            <div className="two columns D3TableContainer-columnHeader">Alt Types</div>
            <div className="one columns D3TableContainer-columnHeader">Classes</div>
            <div className="six columns">
              <div className="row">
                <div className="four columns D3TableContainer-columnHeader">Drop</div>
                <div className="four columns D3TableContainer-columnHeader u-c-kadala">Kadala</div>
                <div className="four columns D3TableContainer-columnHeader u-c-deaths">Breath (Cube)</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='D3TableContainer-table'>
            {self.state.itemTypes.map((x)=> {
              if(self.props.items.some((y)=> y.itemType == x)){
                return <D3AppRowGroup itemType={x} items={items} activeCharacters={activeCharacters} key={D3AppController.generateUUID()} />
              }
            })}
          </div>
          {paginator}
        </div>
      </div>
    )
  }
}
