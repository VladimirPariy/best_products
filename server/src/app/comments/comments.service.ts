import {HttpException} from "@/app/common/errors/exceptions";
import {CommentsModel} from "@/app/comments/comments.model";


class CommentsService {
	async getCommentById(id: number) {
		const comment = await CommentsModel.query().findById(id)
		if (!comment) {
			return HttpException.notFound('Comment not found')
		}
		return comment
	}
	
	async createComment(productId: number, userId: number, message: string) {
		const insertingComment = await CommentsModel.query().insert({
			user: userId,
			product: productId,
			comment_msg: message
		})
		if (!insertingComment) {
			return HttpException.internalServErr('Unsuccessful inserting comment into table')
		}
		return CommentsModel.query()
			.findById(insertingComment.$id()).modify('selectShotComment')
			.withGraphFetched('users(selectShotUserInfo)')
	}
	
	async removeCommentById(id: number) {
		const removedComment = await CommentsModel.query().deleteById(id);
		if (!removedComment) {
			return HttpException.notFound('Comment not found')
		}
		return 'Successful removing'
	}
}

export default new CommentsService();
