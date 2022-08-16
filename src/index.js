import genBoards from "./modules/DOM/genBoardsDOM";
import * as modal from './modules/DOM/modal';
import playGame from './modules/gameController';

genBoards();
playGame();
modal.initModal();
