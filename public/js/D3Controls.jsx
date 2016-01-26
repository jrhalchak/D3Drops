class D3Paginator extends React.Component {
  handleClick(e) {
    D3AppController.changePage(e.target.dataset['page']);
  }
  render() {
    var i = 1,
    totalPages = this.props.totalPages,
    currentPage = this.props.currentPage,
    pageNumbers = [],
    nextPage = currentPage == totalPages ? null : <li className='D3Paginator-pageNumber' key={D3AppController.generateUUID()}>
      <a className='D3Paginator-pageNumberLink' onClick={this.handleClick} data-page={+(currentPage) + 1}><span className='fa fa-chevron-right'></span></a>
    </li>,
    prevPage = currentPage == 1 ? null : <li className='D3Paginator-pageNumber' key={D3AppController.generateUUID()}>
      <a className='D3Paginator-pageNumberLink' onClick={this.handleClick} data-page={+(currentPage) - 1}><span className='fa fa-chevron-left'></span></a>
    </li>;

    while(i <= totalPages) {
      pageNumbers.push(<li className='D3Paginator-pageNumber' key={D3AppController.generateUUID()}>
        <a className={'D3Paginator-pageNumberLink' + (i == currentPage ? ' is-active' : '')} onClick={this.handleClick.bind(this)} data-page={i}>{i}</a>
      </li>);
      i++;
    }

    return <ul className='D3Paginator'>
      {prevPage}
      {pageNumbers}
      {nextPage}
    </ul>
  }
}

class D3AppControlPanel extends React.Component {
  render() {
    return <div className="D3ControlPanel">
      <div className='row u-zi-5'>
        <div className='three columns'>
          <D3Search />
        </div>
        <div className='six columns'>
          <D3CharacterList activeCharacters={this.props.activeCharacters} />
        </div>
        <div className='three columns'>
          <D3ItemTypeDropDown selectedType={this.props.selectedType} itemTypes={this.props.itemTypes} />
        </div>
      </div>
    </div>
  }
}

class D3Search extends React.Component {
  clearIfEmptyOrSubmit(e) {
    if(e.keyCode == 13) {
      D3AppController.updateSearchCache(e.target.value);
    } else if(!e.target.value.trim() && D3AppModel.searchCache) {
      D3AppController.updateSearchCache('');
    }
  }
  updateSearchCache(e) {
    var val = this.refs.searchInput.value;
    D3AppController.updateSearchCache(val.trim());
  }
  render() { return <div>
    <input type='text' className='D3ControlPanel-searchInput' ref='searchInput' onKeyUp={this.clearIfEmptyOrSubmit}/>
    <button className='D3ControlPanel-searchButton' onClick={this.updateSearchCache.bind(this)}>Search</button>
    </div>
  }
}

class D3CharacterList extends React.Component {
  toggleChar(e) {
    var character = e.target.dataset['char'];
    D3AppController.toggleChar(character);
  }
  render() {
    var self = this;
    return <div className='D3CharacterList'>
      <div className='row'>
        {D3AppModel.characters.map((x)=>{
          return <div className='two columns u-textCenter' key={D3AppController.generateUUID()}>
            <a onClick={self.toggleChar} data-char={x} className={'D3CharacterList-portrait D3CharacterList-portrait--' + x + (self.props.activeCharacters.indexOf(x) > -1 ? ' is-active' : '')}>
              <span className='D3CharacterList-portraitTitle'>{x}</span>
            </a>
          </div>
        })}
      </div>
    </div>
  }
}

class D3ItemTypeDropDown extends React.Component {
  fireDropDownChange(e) {
    var target = e.target;
    D3AppController.changeItemType(target.value);
  }
  render() {
    var self = this,
      itemTypes = D3AppModel.itemTypes;

    return <select className='D3ControlPanel-dropDown' onChange={this.fireDropDownChange} defaultValue='all' value={self.props.selectedType}>
      <option key={D3AppController.generateUUID()} value='all'>All Item Types</option>
      {itemTypes.map((x)=> <option key={D3AppController.generateUUID()} value={x}>{x}</option> )}
    </select>
  }
}
