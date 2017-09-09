import { Quote } from '../data/quote.interface'
export class QuotesService{
    private favoriteQuotes:Quote[] = [];

    addQuoteFavorite(quote:Quote){
        this.favoriteQuotes.push(quote)
    }

    removeQuoteFavorite(quote:Quote){
        const pos = this.favoriteQuotes.findIndex((quoteEl:Quote)=>{
            return quoteEl.id ==  quote.id;
        })
        this.favoriteQuotes.splice(pos,1)
    }

    getFavoriteQuotes(){
        return this.favoriteQuotes.slice();
    }
}