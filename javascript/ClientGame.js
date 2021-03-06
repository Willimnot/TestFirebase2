class ClientGame 
{
	constructor(GamePanel,SelectPanel)
	{ this.GamePnl     = GamePanel;
	  this.SelectPnl   = SelectPanel;
	  this.InGame      = false;
	  this.Selected    = 0;
	  this.GridDivs    =[[null,null,null,null,null,null,null,null,null],
			     [null,null,null,null,null,null,null,null,null],
			     [null,null,null,null,null,null,null,null,null],
			     [null,null,null,null,null,null,null,null,null],
			     [null,null,null,null,null,null,null,null,null],
			     [null,null,null,null,null,null,null,null,null],
			     [null,null,null,null,null,null,null,null,null],
			     [null,null,null,null,null,null,null,null,null],
			     [null,null,null,null,null,null,null,null,null]];
	  this.GridEnabled =[[false,false,false,false,false,false,false,false,false],
			     [false,false,false,false,false,false,false,false,false],
			     [false,false,false,false,false,false,false,false,false],
			     [false,false,false,false,false,false,false,false,false],
			     [false,false,false,false,false,false,false,false,false],
			     [false,false,false,false,false,false,false,false,false],
			     [false,false,false,false,false,false,false,false,false],
			     [false,false,false,false,false,false,false,false,false],
			     [false,false,false,false,false,false,false,false,false]];
	  this.SelectDivs  = [null,null,null,null,null,null,null,null,null,
			      null,null,null,null,null,null];
						  
	  this.doInitGameDivs();
	  this.doClearGameDivs();
	}


	InitGame(InitInfo) 
	{
	var i;
	
	  this.doClearGameDivs();
	  this.doSetLetter(this.GridDivs[0][0],InitInfo[0]);
	  this.doSetLetter(this.GridDivs[8][0],InitInfo[1]);
	  this.doSetLetter(this.GridDivs[0][8],InitInfo[2]);
	  this.doSetLetter(this.GridDivs[8][8],InitInfo[3]);
	  for (i=0;i<15;i++)
	  {	this.doSetLetter(this.SelectDivs[i],InitInfo[i+4]);
	  }
	  this.Selected = 0;
	  this.doChangeSelected(0,0);
	  this.InGame = true;
	  for (i=1;i<8;i++)
	  { this.GridEnabled[0][i] = true;
	    this.GridEnabled[i][0] = true;
	    this.GridEnabled[8][i] = true;
	    this.GridEnabled[i][8] = true;
	  }
	}


	doChangeSelected(NewIx,OldIx) 
	{
	var dv,im;
	
	  dv = this.SelectDivs[OldIx];
	  im = dv.firstElementChild;
	  im.setAttribute("src","images/activecell.png");
	  dv = this.SelectDivs[NewIx];
	  im = dv.firstElementChild;
	  im.setAttribute("src","images/enabledcell.png");
	}


	doClearGameDivs() 
	{
	var dv,im,i,j,ix;
	
	  for (i=0;i<9;i++)
	  {	for (j=0;j<9;j++)
		{ this.GridEnabled[j][i] = false;
		  if (((i&j)&1)!=0) continue;
		  dv = this.GridDivs[j][i];
		  im = dv.firstElementChild;
		  ix = 0;
		  if ((i==0)||(i==8)) ix = 1;
		  if ((j==0)||(j==8)) ix = 1;
		  if (ix==1)
		       im.setAttribute("src", "images/activecell.png");
		  else im.setAttribute("src", "images/dormantcell.png");
		  im = im.nextElementSibling;
		  if (im!=null) im.remove();
		}
	  }
	  for (i=0;i<15;i++)
	  {	dv = this.SelectDivs[i];
		im = dv.firstElementChild;
		im.setAttribute("src", "images/activecell.png");
		im = im.nextElementSibling;
		if (im!=null) im.remove();
	  }
	}


	doGridClick(ev) 
	{ console.log(ev.currentTarget);
	  if (this.InGame==false) return;
	  var dv = ev.currentTarget;
	  var id = dv.id;
	  var row  = Number(id[0]);
	  var col  = Number(id[1]);
	  if (this.GridEnabled[col][row]==false) return;
	  var lt = this.SelectDivs[this.Selected];
	  lt = lt.lastElementChild;
	  this.doSetLetter(dv,lt.innerHTML);
		
	}


	doInitGameDivs() 
	{
	var dv,im,i,j;
	
	  for (i=0;i<9;i++)
	  {	for (j=0;j<9;j++)
		{ dv = document.createElement('DIV');
		  dv.classList.add("CellDiv");
		  dv.id = "" + j + "" + i;
		  if (((i&j)&1)==0)
		  {	im = document.createElement("img");
			im.setAttribute("height", "34");
			im.setAttribute("width", "34");
			dv.appendChild(im);
			dv.onclick = this.doGridClick.bind(this);
		  }
		  this.GamePnl.appendChild(dv);
		  this.GridDivs[j][i] = dv;
		}
	  }
	  for (i=0;i<15;i++)
	  {	dv = document.createElement('DIV');
		dv.classList.add("CellDiv");
		dv.id = "" + i;
		im = document.createElement("img");
		im.setAttribute("src", "images/activecell.png");
		im.setAttribute("height", "34");
		im.setAttribute("width", "34");
		dv.appendChild(im);
		dv.onclick = this.doSelectClick.bind(this);
		this.SelectPnl.appendChild(dv);
		this.SelectDivs[i] = dv;
	  }
	}


	doSelectClick(ev) 
	{ console.log(ev.currentTarget);
	  if (this.InGame==false) return;
	  var dv = ev.currentTarget;
	  var id = dv.id;
	  var row  = Number(id);
	  this.doChangeSelected(row,this.Selected);
	  this.Selected = row;
	}


	doSetLetter(TheDiv,Letter) 
	{
	var tx;
	
	  tx = TheDiv.lastElementChild;
	  if ((tx!=null)&&(tx.nodeName==('DIV')))
	  {  tx.innerHTML = Letter;
	  }
	  else
	  {  tx = document.createElement("DIV");
	     tx.classList.add("CellLetter");
	     tx.innerHTML = Letter;
	     TheDiv.appendChild(tx);
	  }
	}


	
	
}
