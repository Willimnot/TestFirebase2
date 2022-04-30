class ClientGame 
{
	constructor(GamePanel,SelectPanel)
	{ this.UserId      = null;
	  this.WaitGameRef = null;
	  this.WaitInfoRef = null;
	  this.GamePnl     = GamePanel;
	  this.SelectPnl   = SelectPanel;
	  this.GridDivs    =[[null,null,null,null,null,null,null,null,null],
						 [null,null,null,null,null,null,null,null,null],
						 [null,null,null,null,null,null,null,null,null],
						 [null,null,null,null,null,null,null,null,null],
						 [null,null,null,null,null,null,null,null,null],
						 [null,null,null,null,null,null,null,null,null],
						 [null,null,null,null,null,null,null,null,null],
						 [null,null,null,null,null,null,null,null,null],
						 [null,null,null,null,null,null,null,null,null]];
	  this.SelectDivs  = [null,null,null,null,null,null,null,null,null,
						  null,null,null,null,null,null];
						  
	  this.doInitGameDivs();
	  this.doClearGameDivs();
	}


	EndGame()
	{
	  this.doClearGameDivs();
	}
	
	
	WaitGameStart(MyUserId)
	{	var typ,gid;
	    this.doClearGameDivs();
	
		this.UserId = MyUserId;
		this.WaitGameRef = firebase.database().ref('players/'+MyUserId+'/GameId'); 
		this.WaitGameRef.on("value",this.doWaitGameStart,this);
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
	}


	doClearGameDivs() 
	{
	var dv,im,i,j,ix;
	
	  for (i=0;i<9;i++)
	  {	for (j=0;j<9;j++)
		{ if (((i&j)&1)!=0) continue;
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
//			dv.onclick = this.doGridClick.bind(this);
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
		
	}


	doSetLetter(TheDiv,Letter) 
	{
	var tx;
	
	  tx = document.createElement("DIV");
	  tx.classList.add("CellLetter");
	  tx.innerHTML = Letter;
	  TheDiv.appendChild(tx);
	}


	doWaitGameInfo(snapshot,x)
	{	var typ,str;
		typ = typeof(snapshot.val());
//		console.log("Start Game Info is " + snapshot.val() 
//		+ " value is of type " + typ); 
		if (typ!=='string') return;
		str = snapshot.val();
		console.log(str);
		this.InitGame(str);

	}
	
	
	doWaitGameStart(snapshot,x)
	{	var typ,gid;
		console.log("Game Id changed to " + snapshot.val() 
		+ " value is of type " + typeof(snapshot.val())); 
		gid = snapshot.val();
		typ = typeof(snapshot.val());
		if ((typ==='number')&&(gid>=0))
		{	console.log('Ready to start game'); 
			this.WaitGameRef.off();
		}
		else
		{
			return;
		}
		this.WaitInfoRef = firebase.database().ref('players/'+this.UserId+'/ToClient'); 
		this.WaitInfoRef.on("value",this.doWaitGameInfo,this);
	}
}
