<?php

namespace HubRecipes\FrontEndBundle\Controller;

use HubRecipes\FrontEndBundle\Entity\Ingredients;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\BrowserKit\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

use HubRecipes\YummlyClientBundle\Services\SearchService;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('HubRecipesFrontEndBundle:Default:index.html.twig');
    }

    public function recipeAction($id)
    {
        $getRecipe = $this->get('hub_recipes_yummly_client.getrecipe_service');
        $recipe = $getRecipe->getRecipe($id);
        return $this->render('HubRecipesFrontEndBundle:Default:single.item.html.twig', array('response' => $recipe));
    }
    //ingredients auto complete
    public function getIngredientsAction(){
        if ($this->get('request')->isXmlHttpRequest()){
            $what = $this->get('request')->request->get('data');

            $em = $this->getDoctrine()->getManager();
            $query = $em->createQuery(
               'SELECT i.ingredient
                FROM HubRecipes\\FrontEndBundle\\Entity\\Ingredients i
                WHERE i.ingredient LIKE :a ')->setParameter('a','%' . $what . '%');

            $products = $query->getArrayResult();
            $a = [];
            if (!$products) {

                $a =[''];
                return new JsonResponse(array("suggestions" => $a));
            }
            for($i = 0; $i< count($products); $i++){
                $a[$i] = $products[$i]['ingredient'];
            }
            return new JsonResponse(array("suggestions" => $a));
        }
    }
    //exists ingredient
    public function existsAction(){
        if ($this->get('request')->isXmlHttpRequest()){
            $what = $this->get('request')->request->get('data');

            $em = $this->getDoctrine()->getManager();
            $query = $em->createQuery(
                'SELECT i.ingredient
                 FROM HubRecipes\\FrontEndBundle\\Entity\\Ingredients i
                 WHERE i.ingredient LIKE :a ')->setParameter('a', $what );
            $products = $query->getArrayResult();
            if (!$products) {
                return new JsonResponse(array("exists" => 'no'));
            } else {
                return new JsonResponse(array("exists" => 'yes'));
            }
        }
    }
}