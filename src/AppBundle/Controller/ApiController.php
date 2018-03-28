<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Route("/api")
 */
class ApiController extends Controller
{
	/**
	 * @Route("/home", name="api_home")
	 */
	public function homeAction(Request $request)
	{
		return new JsonResponse([
			'message' => 'HOME!!!',
		]);
	}

	/**
	 * @Route("/sign-up", name="api_sign_up")
	 */
	public function signUpAction(Request $request)
	{
		try {
			$data = json_decode($request->getContent(), true);
			$em = $this->getDoctrine()->getManager();
			$user = $em->getRepository('AppBundle:User')->registerNewOne($data);
		} catch(\Exception $e) {
			return new JsonResponse([
				'status' => 'fail',
				'message' => $e->getMessage() . ' :: ' . $e->getFile() . ' :: ' . $e->getLine(),
			]);
		}
		return new JsonResponse([
			'status' => 'ok',
			'user' => $user,
		]);
	}
}