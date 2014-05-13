<?php

namespace HubRecipes\FavouritesBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Model\UserInterface;
use Hubrecipes\UsersBundle\Entity\User;
use HubRecipes\FavouritesBundle\Entity\Recipes;
use Symfony\Component\HttpFoundation\RedirectResponse;


class DefaultController extends Controller
{

    function userExistsRecipe($user, $recipe){
        $recipes = $user->getRecipes();
        foreach($recipes as $rec){
            if($rec->getId() == $recipe->getId()){
                return false;
            }
        }
        return true;
    }

    public function addToFavouriteAction(){
        if ($this->get('request')->isXmlHttpRequest()){
            $recipeId = $this->get('request')->request->get('recId');
            $recipeName = $this->get('request')->request->get('recName');
            $recipeUrl = $this->get('request')->request->get('recPhotoUrl');
            $user = $this->getUser();

            $em = $em = $this->getDoctrine()->getManager();
            $recipe = $em->getRepository('FavouritesBundle:Recipes')->findOneBy(array('recipeId' => array($recipeId)));

            if (count($recipe) > 0){
                if($this->userExistsRecipe($user, $recipe)){
                    $recipe->addUser($user);
                    $em->persist($recipe);
                    $em->flush();
                    return new JsonResponse(array('response' => 'successfullyAdded'));
                }
                $em->flush();
                return new JsonResponse(array('response' => 'exists'));
            }

            $recipes = new Recipes();
            $recipes->setRecipeId($recipeId);
            $recipes->setName($recipeName);
            $recipes->setPhotoUrl($recipeUrl);
            $recipes->addUser($user);

            $em->persist($recipes);
            $em->flush();
            return new JsonResponse(array("response" => "successfullyAdded"));
        }
    }

    public function removeFromFavouritesAction($recipeId){
        $em = $this->getDoctrine()->getManager();
        $recipe = $em->getRepository('FavouritesBundle:Recipes')->findOneBy(array('recipeId' =>array($recipeId)));
        $recipe->removeUser($this->getUser());
        $em->flush();
        return new RedirectResponse($this->generateUrl('favourites'));
    }

    public function getUserRecipesAction(){
        $recipes = $this->getUser()->getRecipes()->toArray();
        return $this->render('HubRecipesFrontEndBundle:Default:favourites.html.twig', array('response' => $recipes));
    }
}
