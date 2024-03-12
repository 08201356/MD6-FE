import axios from "axios";

const API_URL = "http://localhost:8080/api/cards/";

class CardService {
    createNewCard(title, boardId, columnId) {
        return axios.post(API_URL + "create", {
            title: title,
            boardId: boardId,
            columnId: columnId
        })
    }

    changeCardTitle(cardId,title) {
        const data = JSON.stringify({ title: title });

        return axios.put(`${API_URL}${cardId}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.data;
        });
    }

    addMemberToCard(cardId,member){
        return axios.post(`${API_URL}${cardId}/members `,{
           username:member
        })
    }

    showMemberToCard(cardId){
        return axios.get(`${API_URL}${cardId}/members`)
    }

    getAttachmentUrl(cardId){
        return axios.get(`${API_URL}${cardId}/attachment`)
    }

    updateAttachmentUrl(cardId, data){
        return axios.put(`${API_URL}${cardId}/attachment`, data)
    }

}
export default new CardService();